import { useState } from 'react';

export const useQuery = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async (url: string) => {
    setIsLoading(true);

    fetch(url)
      .then(async (response) => {
        if (!response.ok) throw new Error('');
        const result = await response.json();

        setData(result);
      })
      .catch()
      .finally(() => setIsLoading(false));
  };

  return { isLoading, data, fetchData };
};
