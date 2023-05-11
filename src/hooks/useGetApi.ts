import { useEffect, useState } from 'react';

function useGetApi<T>(fetchUrl: string) {
  const [data, setData] = useState<T | null>(null);
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
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  return { data, loading, error };
}

export default useGetApi;
