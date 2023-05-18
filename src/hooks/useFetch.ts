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

export const usePostFetch = () => {
  const [error, setError] = useState({ isError: false, message: '' });

  const postData = async <B>(url: string, body?: B) => {
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

export const useDeleteFetch = () => {
  const [error, setError] = useState({ isError: false, message: '' });

  const deleteData = async <B>(url: string, body?: B) => {
    try {
      const data = await fetchAPI(url, {
        method: 'DELETE',
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

  return { deleteData, error };
};

export const usePatchFetch = () => {
  const [error, setError] = useState({ isError: false, message: '' });

  const patchData = async <B>(url: string, body?: B) => {
    try {
      const data = await fetchAPI(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body && JSON.stringify(body),
      });
    } catch (error) {
      if (!(error instanceof Error)) return;
      console.log(error, 'error occure');
      setError({
        isError: true,
        message: error.message,
      });
    }
  };

  return { patchData, error };
};
