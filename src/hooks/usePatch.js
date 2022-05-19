import { useState } from 'react';
import apiClient from 'utils/apiClient';
import { useDispatch } from 'react-redux';
import { getCartAsync } from 'reducers/cart/cart.thunks';

const usePatch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();

  const callPatchApi = (itemId, newQuantity) => {
    setIsLoading(true);

    apiClient
      .patch(url, { itemId: itemId, cartQuantity: newQuantity })
      .then((response) => {
        setIsLoading(false);
        setResult(response.data);
        dispatch(getCartAsync);
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
