import { useCallback, useEffect, useState } from 'react';

import { isError } from '../../shared/utils/isError';

type DataState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

type UseFetchDataOptions<T> = {
  autoFetch?: () => Promise<T>;
};

export const useFetchData = <T>(options?: UseFetchDataOptions<T>) => {
  const [data, setData] = useState<DataState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetch = useCallback(async (apiCall: () => Promise<T>) => {
    setData((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await apiCall();
      setData({ data: result, isLoading: false, error: null });
    } catch (e) {
      if (isError(e)) {
        setData((prev) => ({ ...prev, error: e }));
      }
      throw e;
    }
  }, []);

  const mutate = useCallback(async (apiCall: () => Promise<void>, refetchFn?: () => Promise<T>) => {
    try {
      setData((prev) => ({ ...prev, error: null }));
      await apiCall();

      if (refetchFn) {
        const result = await refetchFn();
        setData({ data: result, isLoading: false, error: null });
      }
    } catch (error) {
      setData((prev) => ({ ...prev, error: error as Error }));
      throw error;
    }
  }, []);

  useEffect(() => {
    if (options?.autoFetch) {
      fetch(options.autoFetch);
    }
  }, [fetch, options?.autoFetch]);

  return { ...data, fetch, mutate };
};
