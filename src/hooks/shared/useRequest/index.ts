import { useEffect, useState } from 'react';
import { ERROR } from '../../../constants/error';

//TODO: 이 훅 필요할까....?
const useRequest = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setHasError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reFetch = async () => {
    setHasError(null);
    setIsLoading(true);
    try {
      const response = await callback();
      setData(response);
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

    throw new Error(ERROR.NETWORK);
  }, [hasError]);

  return { data, reFetch, hasError, isLoading };
};

export default useRequest;
