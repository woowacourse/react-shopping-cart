import PATH from '../constants/path';
import useFetch from './useFetch';

function useDeleteProductFromCart(id) {
  const {
    isLoading: isCartDeleteLoading,
    apiCall: deleteFromCart,
    error: deleteProductFromCartError,
  } = useFetch({ url: `${PATH.CARTS}/${id}`, method: 'DELETE' });

  return { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError };
}

export default useDeleteProductFromCart;
