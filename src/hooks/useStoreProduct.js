import API_URL from '../constants/api';
import PATH from '../constants/path';
import useFetch from './useFetch';

function useStoreProduct(id) {
  const {
    isLoading: isCartAddLoading,
    apiCall: addToCart,
    error: cartAddError,
  } = useFetch({
    url: `${API_URL}/${PATH.CARTS}/`,
    data: { id, quantity: 1 },
    method: 'POST',
  });

  return { isCartAddLoading, addToCart, cartAddError };
}

export default useStoreProduct;
