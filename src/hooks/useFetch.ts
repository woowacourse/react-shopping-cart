import { useEffect, useState } from 'react';

interface useFetchProps<T> {
  url: string;
  method?: string;
  body?: object;
  initialState: T;
}

const useFetch = <T>({ url, method, body, initialState }: useFetchProps<T>) => {
  const [result, setResult] = useState<T>(initialState);
  const [loading, setLoading] = useState(false);
  const [statusCode, setCode] = useState(-1);

  const fetchData = async () => {
    if (loading) return;

    setLoading(true);

    const headers = body && { 'Content-type': 'application/json' };

    const response = await fetch(url, {
      headers,
      body: body && JSON.stringify(body),
      method: method,
    });

    setCode(response.status);

    const fetchedData = await response.json();
    setResult(fetchedData);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { result, loading, statusCode, fetchData };
};

export default useFetch;
