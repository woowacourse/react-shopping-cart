import { useEffect, useState } from 'react';
import { ERROR_TYPE } from '../../../constants/error';
import CustomError from '../../../utils/CustomError';

const useRequest = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reFetch = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const response = await callback();
      setData(response);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    reFetch();
  }, []);

  useEffect(() => {
    if (!errorMessage) return;

    throw new CustomError(ERROR_TYPE.NETWORK, errorMessage);
  }, [errorMessage]);

  return { data, reFetch, errorMessage, isLoading };
};

export default useRequest;
