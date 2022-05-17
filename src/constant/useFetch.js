import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useFetch(API_URL) {
  const [pending, setPending] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPending(true);
    setData(null);
    setError(null);
    axios
      .get(API_URL)
      .then((response) => {
        setPending(false);
        response.data && setData(response.data);
      })
      .catch((error) => {
        setPending(false);
        setError(error.message);
      });
  }, [API_URL]);

  return {pending, data, error};
}
