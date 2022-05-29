import useFetch from 'hooks/useFetch';

import { API } from 'constants/api';
import { useSelector } from 'react-redux';

function useStoreProduct(id) {
  const { userId } = useSelector((state) => state.user);

  const {
    isLoading: isCartAddLoading,
    apiCall: addToCart,
    error: cartAddError,
  } = useFetch({
    url: `/${API.CARTS}/${id}`,
    method: 'POST',
    headers: { userId },
  });

  return { isCartAddLoading, addToCart, cartAddError };
}

export default useStoreProduct;
