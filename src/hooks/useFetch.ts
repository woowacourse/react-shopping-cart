import { useCallback, useEffect, useState } from 'react';

const useFetch = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ isError: boolean; error: Error } | null>(null);

  const fetchData = useCallback(async () => {
    setErrorState(null);
    setIsLoading(true);

    try {
      const data = await fetcher();
      setData(data);
    } catch (error) {
      setErrorState({ isError: true, error: error as Error });
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, errorState, fetchData };
};

export default useFetch;
