import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as cartAction from 'actions/cart/action';
import * as cartThunk from 'actions/cart/thunk';

function useCart() {
  const { items: cartItems } = useSelector((state) => state.cart);
  const checkedItemList = cartItems.content.filter(({ isChecked }) => isChecked === true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartThunk.getList());
  }, []);

  return {
    cartAction,
    cartThunk,
    state: {
      cartItems: cartItems.content,
      isLoading: cartItems.isLoading,
      isLoaded: cartItems.isLoaded,
      errorMessage: cartItems.error,
      checkedItemList,
    },
  };
}

export default useCart;
