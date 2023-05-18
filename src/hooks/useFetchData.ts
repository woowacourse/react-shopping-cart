import { useEffect, useState } from 'react';

const useFetchData = <ResponseData>(fetchUrl: string) => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl]);

  return {
    data,
    loading,
    errorMessage,
  };
};

export default useFetchData;
