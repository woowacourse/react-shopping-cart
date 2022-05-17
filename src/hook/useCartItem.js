import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {CART} from 'store/modules/cart';

export default function useCartItem(path = null) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const deleteCartItem = (payload) => {
    const deleteConfirm = window.confirm('정말 삭제하시겠습니까?');
    if (deleteConfirm) {
      dispatch({type: CART.DELETE, payload});
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

  return {deleteCartItem, addCartItem};
}
