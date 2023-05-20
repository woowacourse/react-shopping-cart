import { useEffect, useState } from 'react';

const useFetch = (url: string, options: RequestInit) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
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
  }, []);

  return { isLoading, data, error };
};

export default useFetch
