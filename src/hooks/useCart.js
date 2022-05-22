import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addCartList,
  getCartList,
  removeCartItem,
  removeCartItemList,
  updateCartItem,
} from 'actions/cart/thunk';
import { updateCartItemAllChecked, updateCartItemChecked } from 'actions/cart/action';

function useCart() {
  const { items: cartItems } = useSelector((state) => state.cart);
  const checkedItemList = cartItems.content.filter(({ isChecked }) => isChecked === true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems.isLoaded === true) {
      return;
    }

    dispatch(getCartList());
  }, []);

  const addItem = ({ id, image, name, price, quantity }) =>
    dispatch(addCartList({ id, image, name, price, quantity }));

  const updateItem = (id, content) => dispatch(updateCartItem(id, content));

  const updateItemChecked = (id, isChecked) => dispatch(updateCartItemChecked(id, isChecked));

  const updateItemAllChecked = (isChecked) => dispatch(updateCartItemAllChecked(isChecked));

  const removeItem = (id) => dispatch(removeCartItem(id));

  const removeItemList = (idList) => dispatch(removeCartItemList(idList));

  return {
    action: {
      addItem,
      updateItem,
      updateItemChecked,
      updateItemAllChecked,
      removeItem,
      removeItemList,
    },
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
