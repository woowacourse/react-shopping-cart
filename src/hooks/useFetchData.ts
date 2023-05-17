import { useEffect, useState } from 'react';

const useFetchData = <T>(url: string, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);
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
