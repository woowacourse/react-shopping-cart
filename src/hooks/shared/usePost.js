import { useState } from 'react';
import apiClient from 'utils/apiClient';

const usePost = (url, payload) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);

  const callPostApi = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.post(url, payload);
      setIsLoading(false);
      setResult(response.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return { isLoading, isError, result, callPostApi };
};

export default usePost;
