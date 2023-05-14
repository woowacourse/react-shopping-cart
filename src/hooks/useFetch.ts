import { useEffect, useState } from 'react';
import { fetchApi } from 'api';

export const useFetch = <T>(url: string, initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ isError: false, message: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchApi(url);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setIsLoading(false);
      setError({
        isError: true,
        message: error.message,
      });
    }
  };

  return { data, error, isLoading };
};
