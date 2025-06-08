import { ToastContext } from '@/context/ToastProvider';
import { useCallback, useContext, useState } from 'react';

export const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const handleRequest = useCallback(
    async <T, R = T>({
      request,
      onSuccess,
      onError,
      options,
    }: {
      request: () => Promise<T>;
      onSuccess?: (data: T) => R | Promise<R>;
      onError?: (error: Error) => void;
      errorData?: T;
      options?: { delay?: number };
    }): Promise<T | R | undefined> => {
      try {
        setIsLoading(true);

        if (options && options.delay) {
          await new Promise((resolve) => setTimeout(resolve, options.delay));
        }

        const data = await request();
        return onSuccess ? onSuccess(data) : data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        showToast(error.message);
        onError && onError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [showToast]
  );

  return { isLoading, handleRequest };
};
