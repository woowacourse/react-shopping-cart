import { useState } from "react";

type MutateOptions<_, TData> = {
  onSuccess?: (result: TData) => void;
  onError?: (error: Error) => void;
};

const useMutation = <TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (
    variables: TVariables,
    options?: MutateOptions<TVariables, TData>
  ) => {
    setIsLoading(true);

    try {
      const result = await mutationFn(variables);

      if (options?.onSuccess) {
        options.onSuccess(result);
      }

      return result;
    } catch (error) {
      setError(error as Error);

      if (options?.onError) {
        options.onError(error as Error);
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export default useMutation;
