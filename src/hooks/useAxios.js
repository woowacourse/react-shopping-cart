import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(axiosParams) {
  const [result, setResult] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const apiCall = async () => {
    try {
      const response = await axios.request(axiosParams);

      setResult(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return [result.data, error, loading];
}

export default useFetch;
