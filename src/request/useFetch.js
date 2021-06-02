import { useEffect, useState } from 'react';
import { BASE_URL } from '../constants';

const useFetch = (url, options = { method: 'GET' }) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}${url}`, options);

        if (!res.ok) {
          throw new Error(response.status);
        }

        if (options.method === 'GET') {
          const json = await res.json();

          setResponse(json);
        } else {
          setResponse(response);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return [response, error];
};

export default useFetch;
