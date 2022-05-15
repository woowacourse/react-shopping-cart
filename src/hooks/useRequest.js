import { useState, useEffect, useCallback } from 'react';

const useRequest = (callback) => {
  const [data, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ isError: false, message: '' });

  const getData = useCallback(async () => {
    return await callback();
  }, [callback]);

  useEffect(() => {
    if (data || error.isError) return;

    getData()
      .then((res) => {
        setDate(res.data);
        setLoading(false);
        return;
      })
      .catch((err) => setError({ isError: true, message: err.message }));
  }, [getData, data, error]);

  return { data, loading, error };
};

export default useRequest;
