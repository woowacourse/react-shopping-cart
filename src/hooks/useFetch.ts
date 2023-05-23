import { useEffect, useState } from 'react';
import { Product } from 'types/product';

export const useFetch = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetcher();

      setData(data);
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, fetchData };
};
