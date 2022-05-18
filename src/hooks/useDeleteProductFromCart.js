import API_URL from '../constants/api';
import PATH from '../constants/path';
import useFetch from './useFetch';

function useDeleteProductFromCart(id) {
  const {
    isLoading: isCartDeleteLoading,
    apiCall: deleteFromCart,
    error: deleteProductFromCartError,
  } = useFetch({ url: `${API_URL}/${PATH.CARTS}/${id}`, method: 'DELETE' });

  return { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError };
}

export default useDeleteProductFromCart;
