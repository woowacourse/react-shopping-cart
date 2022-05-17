import { useState } from 'react';
import apiClient from 'utils/apiClient';

const usePost = (url, payload) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);

  const callApi = () => {
    setIsLoading(true);

    apiClient
      .post(url, payload)
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

export default usePost;
