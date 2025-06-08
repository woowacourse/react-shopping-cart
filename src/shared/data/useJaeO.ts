import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';
import { getSnapshot, refetchData, subscribe } from './dataStore';

interface useJaeOProps<T, R = T> {
  fetchKey: string;
  fetchFn: () => Promise<T>;
  convertFn?: (raw: T) => R;
  onError?: () => void;
  onSuccess?: () => void;
}

export function useJaeO<T, R = T>({
  fetchKey,
  fetchFn,
  convertFn,
  onError,
  onSuccess,
}: useJaeOProps<T, R>) {
  const fetchFnRef = useRef(fetchFn);
  const convertFnRef = useRef(convertFn);
  const onErrorRef = useRef(onError);
  const onSuccessRef = useRef(onSuccess);

  const fetchAndUpdateData = useCallback(async () => {
    return refetchData<T>(fetchKey, {
      fetchFn: fetchFnRef.current,
      onError: onErrorRef.current,
      onSuccess: onSuccessRef.current,
    });
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
    convertFnRef.current = convertFn;
  }, [convertFn]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  const convertedData = useMemo(
    () =>
      snapshot && snapshot.data !== null && snapshot.data !== undefined
        ? convertFnRef.current?.(snapshot.data) ?? (snapshot.data as R)
        : null,
    [snapshot]
  );

  return {
    data: convertedData,
    isLoading: snapshot?.isLoading ?? false,
    isError: snapshot?.isError ?? false,
    refetch: fetchAndUpdateData,
  };
}
