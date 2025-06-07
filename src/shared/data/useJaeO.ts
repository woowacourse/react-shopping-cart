import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { getSnapshot, subscribe, updateData } from './dataStore';

interface useJaeOProps<T> {
  fetchKey: string;
  fetchFn: () => Promise<T>;
  onError?: () => void;
  onSuccess?: () => void;
}

export function useJaeO<T>({
  fetchKey,
  fetchFn,
  onError,
  onSuccess,
}: useJaeOProps<T>) {
  const fetchFnRef = useRef(fetchFn);
  const onErrorRef = useRef(onError);
  const onSuccessRef = useRef(onSuccess);

  const fetchAndUpdateData = useCallback(async () => {
    updateData<T>(fetchKey, {
      isLoading: true,
      isError: false,
    });

    try {
      const data = await fetchFnRef.current();
      updateData(fetchKey, {
        data,
        isLoading: false,
        isError: false,
        fetchFn: fetchFnRef.current,
      });
      onSuccessRef.current?.();
    } catch {
      updateData(fetchKey, {
        data: null,
        isLoading: false,
        isError: true,
      });
      onErrorRef.current?.();
    }
  }, [fetchKey]);

  const snapshot = useSyncExternalStore(
    useCallback(
      (cb) => {
        const unsubscribe = subscribe(fetchKey, cb);
        fetchAndUpdateData();
        return unsubscribe;
      },
      [fetchAndUpdateData, fetchKey]
    ),
    () => getSnapshot<T>(fetchKey)
  );

  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  return {
    data: snapshot?.data,
    isLoading: snapshot?.isLoading ?? false,
    isError: snapshot?.isError ?? false,
    refetch: fetchAndUpdateData,
  };
}
