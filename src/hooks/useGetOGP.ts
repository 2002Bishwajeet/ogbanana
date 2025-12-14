import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOgpExecution, monitorOgpExecution } from "../lib/api";
import { AUTH_SESSION_QUERY_KEY } from "../providers/AuthProvider";
import { useEffect } from "react";

export function useGetOGP(executionId?: string) {
  const queryClient = useQueryClient();

  const {
    mutate: startGeneration,
    isPending: isStarting,
    error: startError,
    data: newExecution,
  } = useMutation({
    mutationFn: async ({ url, context }: { url: string; context: string }) => {
      return createOgpExecution(url, context);
    },
  });

  const {
    data: generatedResult,
    isLoading: isPolling,
    error: pollError,
  } = useQuery({
    queryKey: ["ogp", executionId],
    queryFn: () => monitorOgpExecution(executionId!),
    enabled: !!executionId,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Invalidate auth query to update credits when we get a result
  useEffect(() => {
    if (generatedResult) {
      void queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
    }
  }, [generatedResult, queryClient]);

  const isProcessing = isStarting || (!!executionId && isPolling);
  const error = startError || pollError;

  return {
    startGeneration,
    generatedResult,
    isProcessing,
    error,
    newExecution, // to access the new execution ID after mutation
  };
}
