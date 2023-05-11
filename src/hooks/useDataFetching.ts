import axios from 'axios';
import { useEffect, useState } from 'react';

const useDataFetching = <T>(path: string) => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    setIsLoading(true);

    await axios
      .get(path)
      .then((result) => setData(result.data))
      .catch((error) => {
        // netWork error 확인하기 위해
        // eslint-disable-next-line no-console
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading };
};

export default useDataFetching;
