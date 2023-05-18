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
      .then(resData => {
        setData(resData);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  const refreshQuery = useCallback(async () => {
    setLoading(true);
    setError(null);

    await fetch(fetchUrl)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  return { data, loading, error, refreshQuery };
};

export default useGetQuery;
