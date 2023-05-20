import { useState } from 'react';
import { SetterOrUpdater } from 'recoil';

import { CartItemType, ProductItemType } from '../types';
import { isFailureHttpStatus, isSuccessHttpStatus } from '../utils/httpStatusValidator';

export const useFetch = <T>(
  stateSetter: SetterOrUpdater<ProductItemType[]> | SetterOrUpdater<CartItemType[]>
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (url: string, options: RequestInit) => {
    try {
      const result = await fetch(url, options);
      if (isSuccessHttpStatus(result.status) && stateSetter) {
        const data = await result.json();
        setData(data);
        stateSetter(data);
      }
      if (isFailureHttpStatus(result.status)) {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApi = {
    get: (url: string) => {
      fetchData(url, { method: 'GET' });
    },

    post: (url: string, body: object) => {
      fetchData(url, { method: 'POST', body: JSON.stringify(body) });
    },

    patch: (url: string) => {
      fetchData(url, { method: 'PATCH' });
    },

    put: (url: string) => {
      fetchData(url, { method: 'PUT' });
    },

    delete: (url: string) => {
      fetchData(url, { method: 'DELETE' });
    },
  };

  return { fetchApi, data, isLoading };
};
