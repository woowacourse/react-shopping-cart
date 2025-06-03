import { useState } from "react";
import { Status } from "./types";

interface UseMutationProps<TRequest, TResponse> {
  mutationFn: (variables: TRequest) => Promise<TResponse>;
}

interface MutateOptions {
  onMutate?: () => void;
  onSuccess?: () => void;
  onSettled?: () => void;
  onError?: (error: unknown) => void;
}

export default function useMutation<TRequest, TResponse>({
  mutationFn,
}: UseMutationProps<TRequest, TResponse>) {
  const [status, setStatus] = useState<Status>("idle");

  const mutate = async (variables: TRequest, options?: MutateOptions) => {
    try {
      setStatus("loading");

      options?.onMutate?.();

      await mutationFn(variables);

      options?.onSuccess?.();

      setStatus("success");
    } catch (error) {
      setStatus("error");
      options?.onError?.(error);
      throw error;
    } finally {
      options?.onSettled?.();
    }
  };

  return { mutate, status };
}
