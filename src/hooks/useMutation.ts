import { AxiosError } from 'axios';
import { useState } from 'react';

interface UseMutationOptions<T extends (...args: Parameters<T>) => ReturnType<T>> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

const useMutation = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  mutationFunction: (...args: Parameters<T>) => ReturnType<T>,
  options?: UseMutationOptions<T>,
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
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorMessage(axiosError.message);
      if (options?.onError) {
        options.onError(error);
      }
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
