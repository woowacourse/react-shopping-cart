import { useState, useEffect } from 'react';

const useFetch = (defaultValue, request) => {
  const [data, setData] = useState(defaultValue);
  const [isError, setIsError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await request();

      if (!response.ok) {
        throw response;
      }

      setData(await response.json());
    } catch (response) {
      setIsError(await response.status);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, isError];
};

export default useFetch;
