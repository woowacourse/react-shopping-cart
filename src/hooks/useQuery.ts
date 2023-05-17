import { useMemo } from 'react';
import Future from '../utils/Future';

type UseQueryReturn<TData, TError> = { future: Future<TData, TError> };

const useQuery = <TData, TError = Error>(
  key: string,
  queryFn: () => Promise<TData>,
): UseQueryReturn<TData, TError> => {
  const future = useMemo(() => {
    return new Future<TData, TError>(queryFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { future };
};

export default useQuery;
