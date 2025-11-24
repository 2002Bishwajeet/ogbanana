import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { Models } from "appwrite";
import { generateOgpTags } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { type OGPData } from "../lib/types";

type ExecutionStatus = Models.Execution["status"] | "waiting";

export const useGetOGP = () => {
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus | null>(
    null
  );
  const { user, setUser } = useAuth();
  const mutation = useMutation<
    OGPData,
    Error,
    { urlInput: string; contextInput: string }
  >({
    mutationFn: async ({ urlInput, contextInput }) => {
      if ((!urlInput && !contextInput) || !user) {
        throw new Error("URL or context is required.");
      }
      setExecutionStatus("waiting");
      const data = await generateOgpTags(urlInput, contextInput, {
        onStatusChange: (status) => setExecutionStatus(status),
      });
      return data as OGPData;
    },
    onSuccess: (data) => {
      if (data.creditsRemaining && user) {
        setUser({ ...user, credits: data.creditsRemaining });
      }
    },
    onSettled: () => {
      setExecutionStatus(null);
    },
  });
  return {
    ...mutation,
    executionStatus,
  };
};
