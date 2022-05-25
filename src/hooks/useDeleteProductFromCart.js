import useFetch from 'hooks/useFetch';
import useUser from 'hooks/useUser';

import { API } from 'constants/api';

function useDeleteProductFromCart(query) {
  const { userId } = useUser();

  const {
    isLoading: isCartDeleteLoading,
    apiCall: deleteFromCart,
    error: deleteProductFromCartError,
  } = useFetch({ url: `/${API.CARTS}/${userId}/${query}`, method: 'DELETE' });

  return { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError };
}

export default useDeleteProductFromCart;
