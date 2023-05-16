import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);

        if (res.status === 404) throw new Error('Not Found');

        const data = await res.json();
        setData(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    }

    fetchData();
  }, []);

  return { data, status };
};

export default useFetch;
