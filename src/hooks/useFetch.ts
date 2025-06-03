import { useCallback, useState } from "react";
import { FetchKeyType } from "../types/response";

interface FetchDataProps<T> {
  apiCall: () => Promise<T>;
  onSuccess: (data?: T) => void;
  onError: (error: Error | unknown) => void;
}

const useFetch = <T>(key: FetchKeyType) => {
  const [isLoading, setIsLoading] = useState<Map<FetchKeyType, boolean>>(
    new Map()
  );

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
        const result = await apiCall();

        onSuccess(result);
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
    isLoading: isLoading.get(key) ?? false,
  };
};

export default useFetch;
