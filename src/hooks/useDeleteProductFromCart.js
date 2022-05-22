import PATH from 'constants/path';
import useFetch from 'hooks/useFetch';
import useUser from 'hooks/useUser';

function useDeleteProductFromCart(id) {
  const { userId } = useUser();

  const {
    isLoading: isCartDeleteLoading,
    apiCall: deleteFromCart,
    error: deleteProductFromCartError,
  } = useFetch({ url: `/${PATH.CARTS}/${userId}/${id}`, method: 'DELETE' });

  return { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError };
}

export default useDeleteProductFromCart;
