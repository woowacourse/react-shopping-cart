/* eslint-disable no-console */
import { useEffect, useState } from 'react';

const useDataFetching = <T>(path: string) => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    setIsLoading(true);
    await fetch(path, { method: 'get' })
      .then(async (result) => setData(await result.json()))
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading, refetch: getData };
};

export default useDataFetching;
