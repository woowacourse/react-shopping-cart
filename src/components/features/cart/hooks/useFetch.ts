import { useCallback } from 'react';
import { baseAPI } from '../../../../api/baseAPI';

function useFetch<T>() {
  const fetch = useCallback(async (path: string) => {
    const data = await baseAPI<T>({
      method: 'GET',
      path,
    });
    return data;
  }, []);

  return fetch;
}

export default useFetch;
