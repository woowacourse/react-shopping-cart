import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchErrorState } from '../recoil/atoms';

export default function useFetchError() {
  const [fetchError, setFetchError] = useRecoilState(fetchErrorState);

  const throwFetchError = (error: unknown, defaultErrorMessage: string) => {
    const fetchError = error instanceof Error ? error : new Error(defaultErrorMessage);
    setFetchError(fetchError);
  };

  const resetFetchError = () => {
    setFetchError(null);
  };

  useEffect(() => {
    if (fetchError) {
      throw fetchError;
    }
  }, [fetchError]);

  return { throwFetchError, resetFetchError };
}
