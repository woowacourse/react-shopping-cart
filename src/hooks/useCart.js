import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as cartThunk from 'actions/cart/thunk';

function useCart() {
  const { items: cartItems } = useSelector((state) => state.cart);
  const checkedItemList = cartItems.content.filter(({ isChecked }) => isChecked === true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems.isLoaded === true) {
      return;
    }

    dispatch(cartThunk.getList());
  }, []);

  return {
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
