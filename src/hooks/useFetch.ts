import { useEffect, useState } from 'react';

const useFetch = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setHasError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const doFetch = async () => {
    setHasError(null);
    setIsLoading(true);
    try {
      const value = await callback();

      setData(value);
    } catch (error) {
      setHasError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    doFetch();
  }, []);

  return { data, doFetch, hasError, isLoading };
};

export default useFetch;
