import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

type FetchStatus = 'idle' | 'loading' | 'fail' | 'success';

export type FetchState<T> = {
  status: FetchStatus;
  data: T | null;
  error: Error | null;
};

const useFetch = <T>(url: string, method = 'GET'): [FetchState<T>, (body?: any, param?: number | string) => Promise<void>] => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });
  const navigate = useNavigate();

  const fetchData = useCallback(
    async ({ body, param }: { body?: any; param?: string | number }) => {
      const urlWithParam = param ? `${url}/${param}` : url;

      setFetchState({ status: 'loading', data: null, error: null });

      try {
        const response: Response = await fetch(urlWithParam, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data: T = await response.json();
        setFetchState({ status: 'success', data, error: null });
      } catch (error) {
        setFetchState({ status: 'fail', data: null, error: error as Error });
        navigate('/error', { state: { error: error as Error } });
      }
    },
    [url, method, navigate]
  );

  useEffect(() => {
    if (method.toLowerCase() === 'get') {
      fetchData({});
    }
  }, [fetchData, method]);

  return [fetchState, fetchData];
};

export default useFetch;
