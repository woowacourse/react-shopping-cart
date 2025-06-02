import { useCallback, useState } from "react";

interface FetchDataProps<T> {
  apiCall: () => Promise<T>;
  onSuccess: (data: T) => void;
  onError: (error: Error | unknown) => void;
}

const useFetch = <T>(key: string) => {
  const [isLoading, setIsLoading] = useState<Map<string, boolean>>(new Map());

  const handleLoading = useCallback(
    (loadingState: boolean) => {
      setIsLoading((prev) => {
        return new Map(prev).set(key, loadingState);
      });
    },
    [key]
  );

  const fetchData = useCallback(
    async ({ apiCall, onSuccess, onError }: FetchDataProps<T>) => {
      try {
        handleLoading(true);
        onSuccess(await apiCall());
      } catch (error) {
        onError(error);
      } finally {
        handleLoading(false);
      }
    },
    [handleLoading]
  );

  return {
    fetchData,
    isLoading,
  };
};

export default useFetch;
