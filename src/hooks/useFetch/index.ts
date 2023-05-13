import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    function fetchData() {
      fetch(url)
        .then((res) => res.json())
        .then((json: T) => {
          setData(json);
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  return { data, isLoading };
};

export default useFetch;
