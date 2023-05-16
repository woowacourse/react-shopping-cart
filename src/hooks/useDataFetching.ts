import { useEffect, useState } from 'react';

const useDataFetching = <T>(path: string) => {
  const [fetchingData, setFetchingData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    setIsLoading(true);

    fetch(path)
      .then((response) => {
        if (!response.ok) throw new Error(`${response.status} 에러 발생`);

        return response.json();
      })
      .then((data) => setFetchingData(data))
      .catch((error) => {
        // netWork error 확인하기 위해
        // eslint-disable-next-line no-console
        console.log(error.message);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return { fetchingData, isLoading };
};

export default useDataFetching;
