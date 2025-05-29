import { useCallback, useState } from "react";

interface MutationDataProps {
  apiCall: () => Promise<void>;
  onSuccess: () => void;
  onError: (error: Error | unknown) => void;
}

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const mutateData = useCallback(
    async ({ apiCall, onSuccess, onError }: MutationDataProps) => {
      try {
        setIsLoading(true);
        await apiCall();
        onSuccess();
      } catch (error) {
        onError(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    mutateData,
    isLoading,
  };
};

export default useMutation;
