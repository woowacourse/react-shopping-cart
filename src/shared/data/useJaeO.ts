import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from 'react';
import { getSnapshot, subscribe, updateData } from './dataStore';

interface useJaeOProps<T> {
  fetchKey: string;
  fetchFn: () => Promise<T>;
  onError?: () => void;
}

export function useJaeO<T>({ fetchKey, fetchFn, onError }: useJaeOProps<T>) {
  const data = useSyncExternalStore(
    useCallback((cb) => subscribe(fetchKey, cb), [fetchKey]),
    () => getSnapshot<T>(fetchKey)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchFnRef = useRef(fetchFn);
  const onErrorRef = useRef(onError);

  const fetchAndUpdateData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchFnRef.current();
      updateData(fetchKey, {
        data,
        fetchFn: fetchFnRef.current,
      });
    } catch {
      setIsError(true);
      onErrorRef.current?.();
    } finally {
      setIsLoading(false);
    }
  }, [fetchKey]);

  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!data) {
      fetchAndUpdateData();
    }
  }, [fetchAndUpdateData, data]);

  return {
    data: data?.data as T,
    isLoading,
    isError,
    refetch: fetchAndUpdateData,
  };
}
