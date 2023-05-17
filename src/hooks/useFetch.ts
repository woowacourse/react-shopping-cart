import { useEffect, useState } from 'react';

const useFetch = <T>(url: string, initialValue: T): [T, number] => {
  const [data, setData] = useState<T>(initialValue);
  const [fetchStatus, setFetchStatus] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setFetchStatus(response.status);
          throw new Error();
        }

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [url]);

  return [data, fetchStatus];
};

export default useFetch;
