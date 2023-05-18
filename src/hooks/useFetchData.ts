import { useEffect, useState } from 'react';

const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((response) => {
        setStatus(response.status);
        return response.json();
      })
      .then((json) => setData(json as T))
      .catch(() => setStatus(-1));
  }, [url]);

  return { data, status };
};

export default useFetchData;
