import { useState, useEffect, useRef } from 'react';

import { ERROR } from '@Constants/index';

import { Error } from '@Types/index';

import { isHttpStatusError } from '@Utils/isHttpStatusError';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const httpStatusError = useRef<Error>(ERROR.httpUnknown);

  useEffect(() => {
    setIsLoading(true);

    function fetchData() {
      fetch(url)
        .then((res) => {
          try {
            isHttpStatusError(res.status);
          } catch (error) {
            httpStatusError.current = error as Error;
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

  const currentHttpStatus = httpStatusError.current;
  return { data, isLoading, currentHttpStatus };
};

export default useFetch;
