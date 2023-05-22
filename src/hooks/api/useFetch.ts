import { useEffect, useState } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [promise, setPromise] = useState<Promise<void>>();
  const [error, setError] = useState<Error>();

  const fetchData = async () => {
    const response = await fetch(url);

    try {
      if (!response.ok) {
        throw new Error('데이터를 불러오는 과정에서 문제가 생겼습니다.');
      }

      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setError(error);
    }
  };

  useEffect(() => {
    setPromise(fetchData());
  }, []);

  const getData = () => {
    if (data === null && promise) {
      throw promise;
    }
    return data;
  };

  return { getData, error, fetchData };
};

export default useFetch;
