import { useState } from 'react';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { fetchApi } from 'api';

export const useFetch = <T>() => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async (url: string, options: RequestInit) => {
    try {
      const data = await fetchApi(url, options);
      setData(data);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setIsLoading(false);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const api = {
    get: (url: string) => {
      fetchData(url, { method: 'GET' });
    },
    post: <T>(url: string, body: T) =>
      fetchData(url, {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  };

  return { data, isLoading, api };
};
