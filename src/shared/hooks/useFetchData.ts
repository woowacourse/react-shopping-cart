import { useState, useEffect, useCallback } from "react";

type UseFetchDataParam<T> = {
  fetchFn: () => Promise<T>;
};

const useFetchData = <T>({ fetchFn }: UseFetchDataParam<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await fetchFn();
      setData(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, errorMessage, setErrorMessage, refetch: fetchData };
};

export default useFetchData;
