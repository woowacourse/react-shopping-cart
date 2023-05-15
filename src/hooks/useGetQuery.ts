import { useCallback, useEffect, useState } from 'react';

const useGetQuery = <DataType>(fetchUrl: string) => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch((error: Error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  const refreshQuery = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch((error: Error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  return { data, loading, error, refreshQuery };
};

export default useGetQuery;
