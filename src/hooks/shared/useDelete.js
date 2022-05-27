import { useState } from 'react';
import apiClient from 'utils/apiClient';

const useDelete = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);

  const callDeleteApi = async (targetId) => {
    setIsLoading(true);
    try {
      const response = await apiClient.delete(url, { data: { id: targetId } });
      setIsLoading(false);
      setResult(response.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return { isLoading, isError, result, callDeleteApi };
};

export default useDelete;
