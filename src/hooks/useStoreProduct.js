import PATH from '../constants/path';
import useFetch from './useFetch';
import useUser from './useUser';

function useStoreProduct(id) {
  const { userId } = useUser();

  const {
    isLoading: isCartAddLoading,
    apiCall: addToCart,
    error: cartAddError,
  } = useFetch({
    url: `/${PATH.CARTS}/${userId}/${id}`,
    data: { id, quantity: 1 },
    method: 'POST',
  });

  return { isCartAddLoading, addToCart, cartAddError };
}

export default useStoreProduct;
