import useFetch from 'hooks/useFetch';
import useUser from 'hooks/useUser';

import { API } from 'constants/api';

function useStoreProduct(id) {
  const { userId } = useUser();

  const {
    isLoading: isCartAddLoading,
    apiCall: addToCart,
    error: cartAddError,
  } = useFetch({
    url: `/${API.CARTS}/${userId}/${id}`,
    method: 'POST',
  });

  return { isCartAddLoading, addToCart, cartAddError };
}

export default useStoreProduct;
