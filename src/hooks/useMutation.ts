import { useState } from 'react';

type MutationMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchInfo<T> {
  url: string;
  method: MutationMethod;
  bodyData?: T;
  headers?: HeadersInit;
}

const useMutation = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async ({ url, method, bodyData, headers }: FetchInfo<T>) => {
    setIsLoading(true);

    const body = bodyData ? JSON.stringify(bodyData) : null;

    try {
      const response = await fetch(url, { method, body, headers });

      if (!navigator.onLine) {
        throw new Error('네트워크가 오프라인 상태입니다.');
      }

      if (!response.ok) {
        throw new Error('에러가 발생하였습니다.');
      }

      if (method === 'POST' || 'DELETE' || 'PATCH') {
        const responseData = await response.text();
        if (responseData) {
          const parsedData = JSON.parse(responseData);
          setData(parsedData);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, mutate, isLoading, error };
};

export default useMutation;
