import { useEffect, useRef, useState } from 'react';

const useFetch = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, isSetLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ isError: boolean; error: Error } | null>(null);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    const fetchData = async () => {
      isSetLoading(true);

      try {
        const data = await fetcherRef.current();
        setData(data);
      } catch (error) {
        setErrorState({ isError: true, error: error as Error });
      } finally {
        isSetLoading(false);
      }
    };

    fetchData();
  }, [fetcherRef]);

  return { data, isLoading, errorState };
};

export default useFetch;
