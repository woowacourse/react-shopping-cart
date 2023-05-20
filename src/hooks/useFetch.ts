import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T>(
  url: string,
  options?: RequestInit
): {
  data: T | null;
  isLoading: boolean;
  error: unknown | null;
  refreshData: () => void;
} => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  const refreshData = () => {
    fetchData();
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`API 요청에 실패했습니다. status : ${response.status}`);
      }

      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(true);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refreshData };
};
