import { useMutation } from "@tanstack/react-query";
import { generateOgpTags } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { type OGPData } from "../lib/types";

export const useGetOGP = () => {
  const { user, setUser } = useAuth();
  return useMutation<
    OGPData,
    Error,
    { urlInput: string; contextInput: string }
  >({
    mutationFn: async ({ urlInput, contextInput }) => {
      if ((!urlInput && !contextInput) || !user) {
        throw new Error("URL or context is required.");
      }
      const data = await generateOgpTags(urlInput, contextInput);
      return data as OGPData;
    },
    onSuccess: (data) => {
      if (data.creditsRemaining && user) {
        setUser({ ...user, credits: data.creditsRemaining });
      }
    },
  });
};
