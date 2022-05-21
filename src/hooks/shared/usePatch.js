import { useState } from 'react';
import apiClient from 'utils/apiClient';

const usePatch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);

  const callPatchApi = async (itemId, newQuantity) => {
    setIsLoading(true);

    await apiClient
      .patch(url, { itemId: itemId, cartQuantity: newQuantity })
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

  return { isLoading, isError, result, callPatchApi };
};

export default usePatch;
