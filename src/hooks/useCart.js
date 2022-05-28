import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as cartAction from 'actions/cart/action';
import * as cartThunk from 'actions/cart/thunk';

function useCart() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { items, listAsyncState, curdAsyncState } = cartState;

  const checkedItemList = items.filter(({ isChecked }) => isChecked === true);

  useEffect(() => {
    dispatch(cartThunk.getList());
  }, []);

  return {
    cartAction,
    cartThunk,
    state: {
      cartItems: items,
      cartListAsyncState: listAsyncState,
      cartCurdAsyncState: curdAsyncState,
      checkedItemList,
    },
  };
}

export default useCart;
