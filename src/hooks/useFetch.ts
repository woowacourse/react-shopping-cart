import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetch = async () => {
    try {
      setIsLoading(true);
      fetchFunction().then(result => {
        setData(result);
        setErrorMessage('');
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorMessage(axiosError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    data,
    isLoading,
    errorMessage,
    refetch: fetch,
  };
};

export default useFetch;
