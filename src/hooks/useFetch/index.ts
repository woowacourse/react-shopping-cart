import { useState, useEffect } from 'react';

import { ERROR_MESSAGE } from '@Constants/index';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);

        if (res.status === 400) throw new Error(ERROR_MESSAGE[400]);
        if (res.status === 401) throw new Error(ERROR_MESSAGE[401]);
        if (res.status === 403) throw new Error(ERROR_MESSAGE[403]);
        if (res.status === 404) throw new Error(ERROR_MESSAGE[404]);

        if (res.status === 500) throw new Error(ERROR_MESSAGE[500]);

        if (!res.ok) throw new Error(ERROR_MESSAGE.default);

        const data = await res.json();
        setData(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        if (error instanceof Error) setErrorMessage(error.message);
      }
    }

    fetchData();
  }, []);

  return { data, status, errorMessage };
};

export default useFetch;
