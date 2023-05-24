import { useEffect, useState } from 'react';
import { fetchAPI } from 'src/api';

export const useGetFetch = <T>(url: string, initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState({ isError: false, message: '' });
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const data = await fetchAPI(url);
      setData(data);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError({
        isError: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { data, error, loading, getData };
};

export const usePostFetch = () => {
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState({ isError: false, message: '' });
  const [loading, setLoading] = useState(true);

  const postData = async <B>(url: string, body?: B) => {
    try {
      const data = await fetchAPI(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body && JSON.stringify(body),
      });
      setData(data);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError({
        isError: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, postData, error, loading };
};

export const useDeleteFetch = () => {
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState({ isError: false, message: '' });
  const [loading, setLoading] = useState(true);

  const deleteData = async <B>(url: string, body?: B) => {
    try {
      const data = await fetchAPI(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body && JSON.stringify(body),
      });
      setData(data);
    } catch (error) {
      if (!(error instanceof Error)) return;

      setError({
        isError: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, deleteData, error, loading };
};

export const usePatchFetch = () => {
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState({ isError: false, message: '' });
  const [loading, setLoading] = useState(true);

  const patchData = async <B>(url: string, body?: B) => {
    try {
      const data = await fetchAPI(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body && JSON.stringify(body),
      });
      setData(data);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError({
        isError: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, patchData, error, loading };
};
