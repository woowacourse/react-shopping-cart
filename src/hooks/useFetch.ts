import { useEffect, useState } from 'react';

const useFetch = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setHasError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const reFetch = async () => {
    setHasError(null);
    setIsLoading(true);
    try {
      const value = await callback();
      console.log(value);
      setData(value);
    } catch (error) {
      setHasError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    reFetch();
  }, []);

  return { data, doFetch: reFetch, hasError, isLoading };
};

export default useFetch;
