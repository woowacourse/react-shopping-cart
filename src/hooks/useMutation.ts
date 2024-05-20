import { AxiosError } from 'axios';
import { useState } from 'react';

const useMutation = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  mutationFunction: (...args: Parameters<T>) => ReturnType<T>,
) => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<ReturnType<T>>();
  const [errorMessage, setErrorMessage] = useState('');

  const mutate = async (...args: Parameters<T>) => {
    try {
      setIsPending(true);
      const result = await mutationFunction(...args);
      setData(result);
      setErrorMessage('');
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorMessage(axiosError.message);
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutate,
    isPending,
    data,
    errorMessage,
  };
};

export default useMutation;
