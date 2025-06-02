import { useState } from "react";
import { useQueryClient } from "./QueryProvider";
import { Status } from "./types";

interface UseMutationProps<TRequest, TResponse> {
  mutationFn: (variables: TRequest) => Promise<TResponse>;
}

interface MutateOptions {
  onMutate: (queryClient: ReturnType<typeof useQueryClient>) => void;
}

export default function useMutation<TRequest, TResponse>({ mutationFn }: UseMutationProps<TRequest, TResponse>) {
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<Status>("idle");

  const mutate = async (variables: TRequest, options?: MutateOptions) => {
    try {
      setStatus("loading");

      await mutationFn(variables);

      options?.onMutate?.(queryClient);

      setStatus("success");
    } catch (error) {
      setStatus("error");
      throw error;
    }
  };

  return { mutate, status };
}
