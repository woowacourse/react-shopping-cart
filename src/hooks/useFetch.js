import axios from 'axios';
import { useState } from 'react';

function useFetch({ url, method = 'GET', headers }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const apiCall = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
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
