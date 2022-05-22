import { useState, useEffect, useCallback } from 'react';

const useRequest = (callback) => {
  const [data, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ isError: false, message: '' });

  const getData = useCallback(callback, [callback]);

  useEffect(() => {
    console.log('--');
    getData()
      .then((res) => {
        setDate(res.data);
        setLoading(false);
        return;
      })
      .catch((err) => setError({ isError: true, message: err.message }));
  }, []);

  return { data, loading, error };
};

export default useRequest;
