import { useEffect, useState } from 'react';

const useFetch = <T>(url: string, initialState: T) => {
  const [result, setResult] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const response = await fetch(url);

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
