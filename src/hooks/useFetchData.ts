import { Dispatch, SetStateAction, useState } from 'react';
import { fetchApi } from '../api/fetchApi';

type SetDataType<T> = Dispatch<SetStateAction<T>>;

export const useFetchData = <T>(setData?: SetDataType<T>) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (url: string, body: RequestInit) => {
    try {
      const data = await fetchApi(url, body);

      if (setData) setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const api = {
    get: (url: string) => {
      fetchData(url, {
        method: 'GET',
      });
    },
    post: <T>(url: string, body: T) => {
      fetchData(url, {
        method: 'POST',
        body: JSON.stringify(body),
      });
    },
    patch: <T>(url: string, body: T) => {
      fetchData(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
      });
    },
    delete: <T>(url: string, body: T) => {
      fetchData(url, {
        method: 'DELETE',
        body: JSON.stringify(body),
      });
    },
  };

  return { api, isLoading };
};
