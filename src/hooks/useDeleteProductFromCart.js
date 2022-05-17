import PATH from '../constants/path';
import useDelete from './useDelete';

function useDeleteProductFromCart(id) {
  const {
    isLoading: isCartDeleteLoading,
    apiCall: deleteFromCart,
    error: deleteProductFromCartError,
  } = useDelete(`${PATH.CARTS}/${id}`);

  return { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError };
}

export default useDeleteProductFromCart;
