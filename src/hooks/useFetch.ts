import { client } from 'apis';
import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    const requestData = async () => {
      setLoading(true);
      try {
        const { data, statusText } = await client.get<T>(url);

        if (statusText !== 'OK') throw new Error();
        if (!loading) return;

        setData(data);
      } catch {
        setError('something is wrong!');
      } finally {
        setLoading(false);
      }
    };

    requestData();

    return () => {
      setLoading(false);
    };
  }, [url]);

  return { data, loading, error };
};
