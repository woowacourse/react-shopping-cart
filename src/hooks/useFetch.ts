import { useEffect, useState } from 'react';
import { fetchAPI } from 'src/api';

export const useGetFetch = <T>(url: string, initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState({ isError: false, message: '' });

  const fetchData = async () => {
    try {
      const data = await fetchAPI(url);
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

export const usePostFetch = <B>(url: string) => {
  const [error, setError] = useState({ isError: false, message: '' });

  const postData = async (body?: B) => {
    try {
      const data = await fetchAPI(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body && JSON.stringify(body),
      });
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError({
        isError: true,
        message: error.message,
      });
    }
  };

  return { postData, error };
};
