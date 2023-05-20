import { useCallback, useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [result, setResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => alert(error))
      .finally(() => setIsLoading(false));
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = () => {
    fetchData();
  };

  return { result, isLoading, refresh };
};
