import { useState } from "react";
import { Status } from "./type";

interface UseMutationProps<TRequest, TResponse> extends MutateOptions {
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
  ...props
}: UseMutationProps<TRequest, TResponse>) {
  const [status, setStatus] = useState<Status>("idle");

  const mutate = async (variables: TRequest, options?: MutateOptions) => {
    try {
      setStatus("loading");

      props?.onMutate?.();
      options?.onMutate?.();

      await mutationFn(variables);

      props?.onSuccess?.();
      options?.onSuccess?.();

      setStatus("success");
    } catch (error) {
      setStatus("error");
      props?.onError?.(error);
      options?.onError?.(error);
      throw error;
    } finally {
      props?.onSettled?.();
      options?.onSettled?.();
    }
  };

  return { mutate, status };
}
