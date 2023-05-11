import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = <T>(url: string, initialValue: T): T => {
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [url]);

  return data;
};

export default useFetch;
