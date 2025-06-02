import { useCallback, useState } from "react";

interface MutationDataProps {
  apiCall: () => Promise<void>;
  onSuccess: () => void;
  onError: (error: Error | unknown) => void;
}

const useMutation = (key: string) => {
  const [isLoading, setIsLoading] = useState<Map<string, boolean>>(new Map());

  const handleLoading = useCallback(
    (loadingState: boolean) => {
      setIsLoading((prev) => {
        return new Map(prev).set(key, loadingState);
      });
    },
    [key]
  );

  const mutateData = useCallback(
    async ({ apiCall, onSuccess, onError }: MutationDataProps) => {
      try {
        handleLoading(true);
        await apiCall();
        onSuccess();
      } catch (error) {
        onError(error);
      } finally {
        handleLoading(false);
      }
    },
    [handleLoading]
  );

  return {
    mutateData,
    isLoading,
  };
};

export default useMutation;
