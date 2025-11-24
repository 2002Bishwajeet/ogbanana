import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Models } from "appwrite";
import { generateOgpTags } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { type OGPData } from "../lib/types";
import { AUTH_SESSION_QUERY_KEY } from "../providers/AuthProvider";

type ExecutionStatus = Models.Execution["status"] | "waiting";

export const useGetOGP = () => {
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus | null>(
    null
  );
  const queryClient = useQueryClient();
  const { user } = useAuth();
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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
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
