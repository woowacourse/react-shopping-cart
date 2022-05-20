import PATH from '../constants/path';
import useFetch from './useFetch';

function useStoreProduct(id) {
  const {
    isLoading: isCartAddLoading,
    apiCall: addToCart,
    error: cartAddError,
  } = useFetch({
    url: `${PATH.CARTS}/${id}`,
    data: { id, quantity: 1 },
    method: 'POST',
  });

  return { isCartAddLoading, addToCart, cartAddError };
}

export default useStoreProduct;
