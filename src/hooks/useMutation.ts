import { useState } from 'react';
import Future from '../utils/Future';

type UseMutationReturn<TParams extends unknown[], TData, TError> = {
  future: Future<TData, TError> | null;
  mutate: (...args: TParams) => Promise<TData>;
};

const useMutation = <TParams extends unknown[], TData, TError = Error>(
  mutationFn: (...args: TParams) => Promise<TData>,
): UseMutationReturn<TParams, TData, TError> => {
  const [future, setFuture] = useState<Future<TData, TError> | null>(null);
  const mutate = (...args: TParams): Promise<TData> => {
    const future = new Future<TData, TError>(() => mutationFn(...args));
    setFuture(future);
    return future.toPromise();
  };

  return {
    future,
    mutate,
  };
};

export default useMutation;
