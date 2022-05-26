import useFetch from 'hooks/useFetch';

import { API } from 'constants/api';
import { useSelector } from 'react-redux';

function useDeleteProductFromCart(query) {
  const { userId } = useSelector((state) => state.user);

  const {
    isLoading: isCartDeleteLoading,
    apiCall: deleteFromCart,
    error: deleteProductFromCartError,
  } = useFetch({
    url: `/${API.CARTS}/${query}`,
    method: 'DELETE',
    headers: { userId },
  });

  return { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError };
}

export default useDeleteProductFromCart;
