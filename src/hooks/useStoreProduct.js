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
    data: { id, quantity: 1 },
    method: 'POST',
  });

  return { isCartAddLoading, addToCart, cartAddError };
}

export default useStoreProduct;
