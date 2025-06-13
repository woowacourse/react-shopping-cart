import { useState, useEffect, useCallback } from "react";

type UseFetchDataParam<T> = {
  fetchFn: () => Promise<T>;
};

const useFetchData = <T>({ fetchFn }: UseFetchDataParam<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setErrorMessage(null);

    try {
      const data = await fetchFn();
      setData(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsFetching(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    const firstFetchData = async () => {
      setIsLoading(true);
      await fetchData();
      setIsLoading(false);
    };

    firstFetchData();
  }, [fetchData]);

  return {
    data,
    refetch: fetchData,
    isLoading,
    isFetching,
    errorMessage,
  };
};

export default useFetchData;
