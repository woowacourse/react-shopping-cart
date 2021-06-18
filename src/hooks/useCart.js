import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCartItemThunk,
  changeCartItemQuantityAction,
  deleteCartItemsThunk,
  deleteCartItemThunk,
  getCartItemsThunk,
  toggleAllCartItemAction,
  toggleCartItemAction,
} from '../modules/cart';

export const useCart = () => {
  const { data: cartItems, status } = useSelector(state => state.cart.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsThunk());
  }, [dispatch]);

  const checkedItems = cartItems.filter(item => item.checked);
  const checkedCount = checkedItems.length;
  const totalPrice = checkedItems.reduce((total, { price, quantity }) => {
    return total + price * quantity;
  }, 0);
  const isAllChecked = checkedCount && checkedCount === cartItems.length;

  const addCartItem = item => {
    dispatch(addCartItemThunk(item));
  };

  const deleteCartItem = item => {
    dispatch(deleteCartItemThunk(item));
  };

  const deleteCartItems = () => {
    dispatch(deleteCartItemsThunk());
  };

  const toggleCartItem = id => {
    dispatch(toggleCartItemAction(id));
  };

  const toggleAllCartItem = () => {
    dispatch(toggleAllCartItemAction(isAllChecked));
  };

  const changeCartItemQuantity = ({ id, quantity }) => {
    dispatch(changeCartItemQuantityAction({ id, quantity }));
  };

  return {
    cartStatus: status,
    cartItems,
    totalPrice,
    checkedItems,
    checkedCount,
    isAllChecked,
    addCartItem,
    deleteCartItem,
    deleteCartItems,
    toggleCartItem,
    toggleAllCartItem,
    changeCartItemQuantity,
  };
};
