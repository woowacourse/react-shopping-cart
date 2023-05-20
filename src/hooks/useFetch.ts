import { useState } from 'react';
import { SetterOrUpdater } from 'recoil';

import { CartItemType, ProductItemType } from '../types';

export const useFetch = <T>(
  stateSetter: SetterOrUpdater<ProductItemType[]> | SetterOrUpdater<CartItemType[]>
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (url: string, options: RequestInit) => {
    try {
      const result = await fetch(url, options);
      const data = await result.json();
      setData(data);
      if (stateSetter) stateSetter(data);
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
  };

  return { fetchApi, data, isLoading };
};
