import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError, Method } from 'axios';

type FetchStatus = 'idle' | 'loading' | 'fail' | 'success';

type FetchState<T> = {
  status: FetchStatus;
  data: T | null;
  error: AxiosError | null;
};

const useAxios = <T>(url: string, method: Method = 'get') => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const fetchData = useCallback(
    async (body?: any) => {
      setFetchState({ status: 'loading', data: null, error: null });

      try {
        const response: AxiosResponse<T> = await axios({ url, method, data: body });
        setFetchState({ status: 'success', data: response.data, error: null });
      } catch (error) {
        setFetchState({ status: 'fail', data: null, error: error as AxiosError });
      }
    },
    [url, method]
  );

  useEffect(() => {
    if (method.toLowerCase() === 'get') {
      fetchData();
    }
  }, [fetchData, method]);

  return [fetchState, fetchData];
};

export default useAxios;
