import {useDispatch, useSelector} from 'react-redux';
import {getCart, editCart, deleteCart, postCart} from 'store/cart';

const useCart = () => {
  const dispatch = useDispatch();

  const {pending, error, data} = useSelector((state) => state.cartReducer);

  const getCartList = () => {
    dispatch(getCart());
  };

  const postCartItem = (id) => {
    dispatch(postCart(id));
  };

  const addQuantity = (id, quantity) => {
    dispatch(editCart(id, quantity + 1));
  };

  const minusQuantity = (id, quantity) => {
    dispatch(editCart(id, quantity - 1));
  };

  const deleteItem = (id) => {
    dispatch(deleteCart(id));
  };

  return {pending, error, data, getCartList, postCartItem, addQuantity, minusQuantity, deleteItem};
};

export default useCart;
