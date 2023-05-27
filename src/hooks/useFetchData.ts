import { useCallback, useState } from 'react';

type MethodType = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async <BodyData>(url: string, methodType: MethodType, body?: BodyData) => {
    try {
      const response = await fetch(url, {
        method: methodType,
        body: body ? JSON.stringify(body) : null,
      });

      const responseData = await response.text();
      const jsonData = responseData === '' ? {} : JSON.parse(responseData);

      return {
        data: jsonData,
        headerData: response.headers,
      };
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
      setError(null);
    }
  }, []);

  return {
    loading,
    error,
    fetchData,
  };
};

export default useFetchData;
