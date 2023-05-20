import { useEffect, useState } from 'react';

interface useFetchProps<T> {
  url: string;
  method?: string;
  body?: object;
  initialState: T;
}

const useFetch = <T>({ url, method, body, initialState }: useFetchProps<T>) => {
  const [result, setResult] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const headers = body && { 'Content-type': 'application/json' };

    const response = await fetch(url, {
      headers,
      body: body && JSON.stringify(body),
      method: method,
    });

    if (!response.ok) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const fetchedData = await response.json();
    setResult(fetchedData);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { result, isLoading, isError, fetchData };
};

export default useFetch;
