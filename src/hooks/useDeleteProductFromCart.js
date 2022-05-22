import useFetch from 'hooks/useFetch';
import useUser from 'hooks/useUser';

import { API } from 'constants/api';

function useDeleteProductFromCart(id) {
  const { userId } = useUser();

  const {
    isLoading: isCartDeleteLoading,
    apiCall: deleteFromCart,
    error: deleteProductFromCartError,
  } = useFetch({ url: `/${API.CARTS}/${userId}/${id}`, method: 'DELETE' });

  return { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError };
}

export default useDeleteProductFromCart;
