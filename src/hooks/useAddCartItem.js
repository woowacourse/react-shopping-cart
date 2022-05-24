import useFetch from 'hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setCart } from 'reducers/cart/cart.actions';

const useAddCartItem = () => {
  const dispatch = useDispatch();
  const { fetchApi } = useFetch({
    method: 'post',
    url: '/cart',
    handler: (data) => dispatch(setCart(data)),
  });

  const addCarItem = (id) => {
    fetchApi(id);
  };

  return { addCarItem };
};

export default useAddCartItem;
