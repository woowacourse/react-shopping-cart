import { useState, useEffect } from 'react';

import { fetchMethod } from '@Types/index';

import { ERROR_MESSAGE } from '@Constants/index';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function fetchData({
    url,
    isGetData = false,
    method = 'GET',
    body,
  }: {
    url: string;
    isGetData?: boolean;
    method?: fetchMethod;
    body?: BodyInit | null | undefined;
  }) {
    try {
      const res = await fetch(url, {
        method,
        body,
      });

      if (res.status === 400) throw new Error(ERROR_MESSAGE[400]);
      if (res.status === 401) throw new Error(ERROR_MESSAGE[401]);
      if (res.status === 403) throw new Error(ERROR_MESSAGE[403]);
      if (res.status === 404) throw new Error(ERROR_MESSAGE[404]);

      if (res.status === 500) throw new Error(ERROR_MESSAGE[500]);

      if (!res.ok) throw new Error(ERROR_MESSAGE.default);

      if (isGetData) {
        const data = await res.json();
        setData(data);
      }
      setStatus('success');
    } catch (error) {
      setStatus('error');
      if (error instanceof Error) setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    fetchData({ url, isGetData: true });
  }, []);

  return { data, status, errorMessage, fetchData };
};

export default useFetch;
