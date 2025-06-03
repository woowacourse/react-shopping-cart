import { useContext, useEffect, useState, useCallback } from 'react';
import { ApiContext, CachedData } from '../contexts/ApiContext';
import { useToast } from './useToast';
import { TTL } from '../constants/ttl';

interface UseApiContextProps<T> {
  fetchFn: () => Promise<T>;
  key: string;
}

export function useApiContext<T>({ fetchFn, key }: UseApiContextProps<T>) {
  const { data, setDataState } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { addToast } = useToast();

  const request = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetchFn();
      setDataState((prev) => ({
        ...prev,
        [key]: { value: res, fetchedAt: Date.now() } as CachedData<T>
      }));
    } catch (e) {
      setError(e instanceof Error ? e : new Error('알 수 없는 에러가 발생했습니다.'));
      addToast({ message: e instanceof Error ? e.message : '알 수 없는 에러가 발생했습니다.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, key, setDataState, addToast]);

  useEffect(() => {
    const cached = data[key] as CachedData<T> | undefined;

    if (cached) {
      const age = Date.now() - cached.fetchedAt;
      if (age > TTL) {
        request();
      }
    } else {
      request();
    }
  }, [data, key, request]);

  return {
    data: (data[key] as CachedData<T>)?.value as T | undefined,
    isLoading,
    error,
    fetcher: request
  };
}
