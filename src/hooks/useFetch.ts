import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>(null);

  const requestData = async () => {
    setLoading(true);

    try {
      const { data }: { data: T } = await axios.get(url);

      setData(data);
    } catch {
      setError('something is worng!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestData();
  }, [url]);

  return { data, loading, error };
};
