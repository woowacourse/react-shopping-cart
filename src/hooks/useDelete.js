import { useState } from 'react';
import apiClient from 'utils/apiClient';

const useDelete = (url, payload) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);

  const callApi = () => {
    setIsLoading(true);

    // post와 delete는 메서드 차이만 있음
    apiClient
      .delete(url, payload)
      .then((response) => {
        setIsLoading(false);
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  return { isLoading, isError, result, callApi };
};

export default useDelete;
