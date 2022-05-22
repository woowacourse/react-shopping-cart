import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addCartList, getCartList, updateCartItem } from 'actions/cart/thunk';
import { updateCartItemChecked } from 'actions/cart/action';

function useCart() {
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems.isLoaded === true) {
      return;
    }

    dispatch(getCartList());
  }, []);

  const addItem = ({ id, image, name, price, quantity }) => {
    dispatch(addCartList({ id, image, name, price, quantity }));
  };

  const updateItem = (id, content) => {
    dispatch(updateCartItem(id, content));
  };

  const updateItemChecked = (id, isChecked) => {
    dispatch(updateCartItemChecked(id, isChecked));
  };

  const removeItem = (id) => {};

  return {
    action: { addItem, updateItem, updateItemChecked, removeItem },
    state: {
      cartItems: cartItems.content,
      isLoading: cartItems.isLoading,
      isLoaded: cartItems.isLoaded,
      error: cartItems.error,
    },
  };
}

export default useCart;
