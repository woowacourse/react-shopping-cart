import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {CART} from 'store/modules/cart';
import {SELECTED_ITEM} from 'store/modules/selectedItem';

export default function useCartItem(path = null) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const deleteCartItem = (payload) => {
    const deleteConfirm = window.confirm('장바구니에서 삭제하시겠습니까?');
    if (deleteConfirm) {
      dispatch({type: CART.DELETE, payload});
      dispatch({type: SELECTED_ITEM.DELETE, payload});
      return;
    }

    if (!path) {
      return;
    }
    navigation(path);
  };

  const addCartItem = (payload) => {
    dispatch({type: CART.ADD, payload});

    if (!path) {
      return;
    }
    navigation(path);
  };

  const increaseQuantity = (payload) => dispatch({type: CART.INCREASE_QUANTITY, payload});

  const decreaseQuantity = (payload) => dispatch({type: CART.DECREASE_QUANTITY, payload});

  const deleteSelectedCart = (payload) => {
    const deleteConfirm = window.confirm('장바구니에서 삭제하시겠습니까?');
    if (deleteConfirm) {
      dispatch({type: SELECTED_ITEM.DELETE_ALL});
      dispatch({type: CART.DELETE_SELECTED_CART, payload});
      return;
    }
  };

  return {deleteCartItem, addCartItem, increaseQuantity, decreaseQuantity, deleteSelectedCart};
}
