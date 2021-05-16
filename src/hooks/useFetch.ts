import { useEffect, useState } from 'react';
import { NETWORK_ERROR } from '../constants/error';

const useFetch = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setHasError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const reFetch = async () => {
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
    reFetch();
  }, []);

  useEffect(() => {
    if (!hasError) return;

    throw new Error(NETWORK_ERROR);
  }, [hasError]);

  return { data, fetchCartItemRedux: reFetch, hasError, isLoading };
};

export default useFetch;
