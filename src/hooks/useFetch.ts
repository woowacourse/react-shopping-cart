import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url: string, query?: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  if (!query) {
    return { data, loading, error };
  }

  const fetchGetRequest = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(query ? `${url}?${query}` : url);
      setData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGetRequest();
  }, [url]);

  return { data, loading, error };
};
export default useFetch;
