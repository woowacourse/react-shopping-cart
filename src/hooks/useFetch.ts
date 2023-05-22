import { useState } from 'react';
import { SetterOrUpdater } from 'recoil';

import { CartItemType, ProductItemType } from '../types';
import { isFailureHttpStatus, isSuccessHttpStatus } from '../utils/httpStatusValidator';

type fetchResult = boolean | null;

export const useFetch = <T>(
  stateSetter: SetterOrUpdater<ProductItemType[]> | SetterOrUpdater<CartItemType[]>
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState<fetchResult>(null);
  const [isFailure, setIsFailure] = useState<fetchResult>(null);

  const fetchData = async (url: string, options: RequestInit) => {
    let shouldExecuteFinally = true;

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
      setIsLoading(false);
      if (options.method !== 'GET') {
        setIsFailure(true);
        await new Promise((resolve) => setTimeout(resolve, 2500));

        setIsSuccess(null);
        setIsFailure(null);
      }
      shouldExecuteFinally = false;

      return;
    } finally {
      if (shouldExecuteFinally) {
        setIsLoading(false);
        if (options.method !== 'GET') {
          setIsSuccess(true);
          await new Promise((resolve) => setTimeout(resolve, 2500));
          setIsFailure(false);
          setIsSuccess(false);
        }
      }
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

  return { fetchApi, data, isLoading, isSuccess, isFailure, setIsSuccess, setIsFailure };
};
