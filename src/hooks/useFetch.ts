import { useEffect, useState } from 'react';
import { fetchApi } from 'src/api';

export const useFetch = <T>(url: string, initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState({ isError: false, message: '' });

  const fetchData = async () => {
    try {
      const data = await fetchApi(url);
      setData(data);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError({
        isError: true,
        message: error.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error };
};
