import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {CART, getCartList} from 'store/modules/cart';
import {SELECTED_ITEM} from 'store/modules/selectedItem';
import useFetch from './useFetch';

export default function useCartItem(path = null) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const {fetch: postCart} = useFetch({
    method: 'post',
    API_URL: process.env.REACT_APP_CART_API_URL,
  });

  const {fetch: deleteCart} = useFetch({
    method: 'delete',
    API_URL: process.env.REACT_APP_CART_API_URL,
  });

  const {fetch: patchCart} = useFetch({
    method: 'patch',
    API_URL: process.env.REACT_APP_CART_API_URL,
  });

  const initializeCartList = () => dispatch(getCartList());

  const deleteCartItem = (payload) => {
    const deleteConfirm = window.confirm('장바구니에서 삭제하시겠습니까?');
    if (deleteConfirm) {
      dispatch({type: CART.DELETE, payload});
      dispatch({type: SELECTED_ITEM.DELETE, payload});
      deleteCart({
        params: `/${payload}`,
      });
      return;
    }

    if (!path) {
      return;
    }
    navigation(path);
  };

  const addCartItem = (payload) => {
    dispatch({type: CART.ADD, payload});
    postCart({
      body: payload,
    });
    if (!path) {
      return;
    }
    navigation(path);
  };

  const increaseQuantity = (payload) => {
    const {quantity, id} = payload;
    dispatch({type: CART.INCREASE_QUANTITY, payload: id});
    patchCart({
      params: `/${id}`,
      body: {
        quantity: quantity + 1,
      },
    });
  };

  const decreaseQuantity = (payload) => {
    const {quantity, id} = payload;
    dispatch({type: CART.DECREASE_QUANTITY, payload: id});
    patchCart({
      params: `/${id}`,
      body: {
        quantity: Math.max(quantity - 1, 1),
      },
    });
  };

  const deleteSelectedCart = (payload) => {
    const deleteConfirm = window.confirm('장바구니에서 삭제하시겠습니까?');
    if (deleteConfirm) {
      dispatch({type: SELECTED_ITEM.DELETE_ALL});
      dispatch({type: CART.DELETE_SELECTED_CART, payload});
      payload.forEach((id) =>
        deleteCart({
          params: `/${id}`,
        }),
      );
      return;
    }
  };

  return {
    initializeCartList,
    deleteCartItem,
    addCartItem,
    increaseQuantity,
    decreaseQuantity,
    deleteSelectedCart,
  };
}
