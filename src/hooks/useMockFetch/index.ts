import { useEffect, useState } from 'react';

export const useMockFetch = <T>(fetchData: T) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setData(fetchData);
      setIsLoading(false);
    }, 300);
  }, []);

  return { data, isLoading };
};
