/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';

const useGetData = <ResponseData>(fetchUrl: string, onSuccess?: (data: ResponseData) => void) => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getData = useCallback(
    async (subUrl = '') => {
      setLoading(true);
      setErrorMessage('');
      try {
        const response = await fetch(`${fetchUrl}/${subUrl}`);
        const responseData = await response.json();
        setData(responseData);
        onSuccess?.(responseData);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchUrl]
  );

  return {
    data,
    loading,
    errorMessage,
    getData,
  };
};

export default useGetData;
