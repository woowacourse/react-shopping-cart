// import { isHttpStatusError } from '@Utils/isHttpStatusError';

import { useState, useEffect, useRef } from 'react';

import { isHttpStatusError } from '../../utils/isHttpStatusError';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const errorMessage = useRef('');

  useEffect(() => {
    setIsLoading(true);

    function fetchData() {
      fetch(url)
        .then((res) => {
          try {
            isHttpStatusError(res.status);
          } catch (error) {
            if (error instanceof Error) errorMessage.current = error.message;
            return undefined;
          }
          return res.json();
        })
        .then((json: T) => {
          setData(json);
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  const currentErrorMessage = errorMessage.current;
  return { data, isLoading, currentErrorMessage };
};

export default useFetch;
