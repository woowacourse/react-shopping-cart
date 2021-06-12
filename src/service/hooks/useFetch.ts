import { HTTPError, FetchError } from './../../utils/error';
import { useEffect, useState } from 'react';

interface UseFetchOption {
  isMutation: boolean;
}

const useFetch = <T>(callback: () => Promise<T>, option?: UseFetchOption) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<FetchError | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const value = await callback();

      setData(value);
      setIsSuccess(true);
    } catch (newError) {
      setError(newError);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (option?.isMutation) return;

    fetchData();
  }, []);

  return { data, fetch: fetchData, error, isLoading, isSuccess };
};

export default useFetch;
