import { AxiosResponse } from 'axios';
import { useState } from 'react';

const useFetch = (callback: () => Promise<AxiosResponse>) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const callUseFetch = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await callback();
      setData(response.data);
    } catch (error) {
      throw Error(error);
    }

    setIsLoading(false);
  };

  return { data, callUseFetch };
};

export default useFetch;
