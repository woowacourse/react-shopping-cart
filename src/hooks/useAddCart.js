import { useParams } from 'react-router-dom';
import useReduxState from 'hooks/useReduxState';
import { addCartAsync } from 'reducers/cart/cart.thunks';

const useAddCart = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('cart');

  const { id } = useParams();

  const addCartItem = () => {
    dispatch(addCartAsync(id));
  };

  return { addCartItem, cart: data, isLoading, isError };
};

export default useAddCart;
