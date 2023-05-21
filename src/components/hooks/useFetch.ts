import { useState } from 'react';
import { fetchApi } from '../../api';

export const useFetch = <T>() => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (url: string, options: RequestInit) => {
    try {
      const data = await fetchApi(url, options);

      setData(data);
    } catch (error) {
      if (!(error instanceof Error)) return;

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getAPI = (url: string) => {
    fetchData(url, { method: 'GET' });
  };

  const postAPI = <T>(url: string, body: T) =>
    fetchData(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });

  const patchAPI = <T>(url: string, body: T) =>
    fetchData(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

  const deleteAPI = (url: string) => {
    fetchData(url, {
      method: 'DELETE',
    });
  };

  return { data, isLoading, getAPI, postAPI, patchAPI, deleteAPI };
};
