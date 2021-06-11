import { useEffect, useState } from 'react';

const useFetch = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const value = await callback();
      setData(value);
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return { data, error, isLoading };
};

export default useFetch;
