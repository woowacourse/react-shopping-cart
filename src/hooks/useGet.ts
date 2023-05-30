/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const useGet = <T>(url: string, headers?: HeadersInit) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(url, { headers })
      .then((response) => {
        if (!navigator.onLine) {
          throw new Error('네트워크가 오프라인 상태입니다.');
        }

        if (!response.ok) {
          throw new Error('에러가 발생하였습니다.');
        }

        return response.json();
      })
      .then((responseData) => setData(responseData))
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, error };
};

export default useGet;
