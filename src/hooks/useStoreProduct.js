import PATH from '../constants/path';
import usePost from './usePost';

function useStoreProduct(id) {
  const {
    isLoading: isCartAddLoading,
    apiCall: addToCart,
    error: cartAddError,
  } = usePost({
    url: `${PATH.CARTS}/`,
    data: { id, quantity: 1 },
  });

  return { isCartAddLoading, addToCart, cartAddError };
}

export default useStoreProduct;
