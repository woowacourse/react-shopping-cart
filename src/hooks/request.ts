import { useEffect, useState } from 'react';

const useRequest = (requestData: Function) => {
  const [loading, setLoading] = useState(true);
  const [responseOK, setResponseOK] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        requestData();
        setResponseOK(true);
      } catch (error) {
        console.error(error);
        setResponseOK(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return { loading, responseOK };
};

export default useRequest;
