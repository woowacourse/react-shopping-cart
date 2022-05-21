import {useState} from 'react';
import axios from 'axios';

export default function useFetch({method = 'get', API_URL}) {
  const [pending, setPending] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetch = ({params = '', body = null}) => {
    setPending(true);
    setData(null);
    setError(null);

    axios[method](API_URL + params, body)
      .then((response) => {
        setPending(false);
        response.data && setData(response.data);
      })
      .catch((error) => {
        setPending(false);
        setError(error.message);
      });
  };

  return {pending, data, error, fetch};
}
