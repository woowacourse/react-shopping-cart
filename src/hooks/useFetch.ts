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
        if (await result.body) {
          if (url.split('/').includes('/cart-items')) {
            stateSetter(
              data.map((item: CartItemType) => {
                return {
                  ...item,
                  isChecked: true,
                };
              })
            );
          } else {
            stateSetter(data);
          }
        }
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
        setIsSuccess(true);
      }
    }
  };

  const fetchApi = {
    get: (url: string) => {
      fetchData(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    },

    post: (url: string, body: object) => {
      fetchData(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
    },

    patch: (url: string, body?: object) => {
      fetchData(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
    },

    put: (url: string) => {
      fetchData(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
    },

    delete: (url: string) => {
      fetchData(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    },
  };

  return { fetchApi, data, isLoading, isSuccess, isFailure, setIsSuccess, setIsFailure };
};
