import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchFunction();
      return response;
    };
    try {
      setIsLoading(true);
      fetch().then(result => {
        setData(result);
        setErrorMessage('');
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorMessage(axiosError.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  return {
    data,
    isLoading,
    errorMessage,
  };
};

export default useFetch;
