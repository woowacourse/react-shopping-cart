import axios from 'axios';
import { useEffect, useState } from 'react';

const useDataFetching = <T>(path: string) => {
  const [data, setData] = useState<T | undefined>();

  const getData = () =>
    axios
      .get(path)
      .then((result) => setData(result.data))
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    getData();
  }, []);

  return { data };
};

export default useDataFetching;
