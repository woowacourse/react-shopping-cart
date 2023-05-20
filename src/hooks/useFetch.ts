import { useEffect, useState } from 'react';

const useFetch = <T>(url: string, options: RequestInit):{
  data: T | null;
  isLoading: boolean;
  error: unknown | null;
  refetch: ()=>{}
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        if (!response.ok)
          throw new Error(
            `api 요청을 실패했습니다! status: ${response.status}`
          );
        const data = await response.json();

        setIsLoading(false);
        setData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch =  async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(
          `api 요청을 실패했습니다! status: ${response.status}`
        );
      const data = await response.json();

      setIsLoading(false);
      setData(data);
    } catch (error) {
      setError(error);
    }
  };

  return { isLoading, data, error, refetch };
};

export default useFetch
