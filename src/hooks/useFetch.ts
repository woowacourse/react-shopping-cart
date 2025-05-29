import { useCallback, useState } from "react";

interface FetchDataProps<T> {
  apiCall: () => Promise<T>;
  onSuccess: (data: T) => void;
  onError: (error: Error | unknown) => void;
}

const useFetch = <T>() => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async ({ apiCall, onSuccess, onError }: FetchDataProps<T>) => {
      try {
        setIsLoading(true);
        onSuccess(await apiCall());
      } catch (error) {
        onError(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    fetchData,
    isLoading,
  };
};

export default useFetch;
