import { useEffect, useState } from 'react';

const useFetch = (url: string, method?: string, data?: object) => {
  const [result, setResult] = useState<object>();
  const [loading, setLoading] = useState(false);
  const [statusCode, setCode] = useState(-1);

  const fetchData = async () => {
    if (loading) return;

    setLoading(true);

    const headers = data && { 'Content-type': 'application/json' };

    const response = await fetch(url, {
      headers,
      body: JSON.stringify(data || {}),
      method: method,
    });

    setCode(response.status);

    const fetchedData = await response.json();
    setResult(fetchedData);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { result, loading, statusCode, fetchData };
};

export default useFetch;
