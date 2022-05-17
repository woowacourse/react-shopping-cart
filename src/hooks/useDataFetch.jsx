import { useEffect, useState } from 'react';

function useDataFetch(initialUrl, initialData) {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const body = await fetch(url);
        setData(await body.json());
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
}

export default useDataFetch;
