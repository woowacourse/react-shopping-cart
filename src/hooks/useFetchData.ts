import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchData = <T>(url: string, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setStatus(response.status);
      } catch (error) {
        setStatus(-1);
      }
    };

    fetchData();
  }, [url]);

  return { data, status };
};

export default useFetchData;
