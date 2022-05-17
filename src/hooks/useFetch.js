import axios from 'axios';
import { useState } from 'react';

function useFetch({ url, data, method = 'GET' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const apiCall = async () => {
    setIsLoading(true);
    try {
      const response = await axios({ url, method, data });
      setResult(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, result, apiCall };
}

export default useFetch;
