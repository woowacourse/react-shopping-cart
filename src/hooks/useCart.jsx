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

  const addQuantity = (id) => {
    const editItem = data.find(({id: cartedId}) => cartedId === id);
    dispatch(editCart(id, editItem.quantity + 1));
  };

  const minusQuantity = (id) => {
    const editItem = data.find(({id: cartedId}) => cartedId === id);
    dispatch(editCart(id, editItem.quantity - 1));
  };

  const deleteItem = (id) => {
    dispatch(deleteCart(id));
  };

  return {pending, error, data, getCartList, postCartItem, addQuantity, minusQuantity, deleteItem};
};

export default useCart;
