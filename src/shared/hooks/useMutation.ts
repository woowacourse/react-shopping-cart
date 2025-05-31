import { useCallback, useState } from "react";

const useMutation = <TVariables>(
  mutationFn: (variables: TVariables) => Promise<void>
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        await mutationFn(variables);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn]
  );

  return { mutate, isLoading, errorMessage };
};

export default useMutation;
