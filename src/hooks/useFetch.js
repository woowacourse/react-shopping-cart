import axios from 'axios';
import { useState } from 'react';

function useFetch({ url, method = 'GET', headers }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);

  const apiCall = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios({ url, method, data, headers });
      setResult(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  return { isLoading, error, result, apiCall };
}

export default useFetch;
