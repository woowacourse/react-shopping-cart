import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = <T>(url: string, initialValue: T): [T, boolean] => {
  const [data, setData] = useState<T>(initialValue);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsError(true);
      }
    };

    fetchData();
  }, [url]);

  return [data, isError];
};

export default useFetch;
