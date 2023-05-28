import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import HTTPError from '../../api/HTTPError';
import { errorModalMessageState } from '../../store/error';

type MutationFunction<T, V> = (variables: V) => Promise<T>;

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error | HTTPError) => void;
}

interface MutationResult<V> {
  mutate: (variables: V) => void;
  state: {
    isLoading: boolean;
    error: Error | HTTPError | null;
  };
}

const useMutationFetch = <T, V = undefined>(
  mutationFn: MutationFunction<T, V>,
  { onSuccess, onError }: MutationOptions<T> = {}
): MutationResult<V> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | HTTPError | null>(null);
  const setErrorModalMessage = useSetRecoilState(errorModalMessageState);

  const mutate = useCallback(
    (variables: V) => {
      setIsLoading(true);
      mutationFn(variables)
        .then((data) => {
          setIsLoading(false);
          setError(null);
          onSuccess?.(data);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
          onError?.(error);
        });
    },
    [mutationFn, onSuccess, onError]
  );

  useEffect(() => {
    if (error) {
      setErrorModalMessage(error.message);
    }
  }, [error, setErrorModalMessage]);

  return { mutate, state: { isLoading, error } };
};

export { useMutationFetch };
