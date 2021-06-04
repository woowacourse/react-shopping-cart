import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from './useStore';
import * as T from '../types';
import cartSlice, { addCartItem, deleteCheckedItems, deleteItem, getCartItems } from '../slices/cartSlice';
import MESSAGE from '../constants/messages';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCart = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const { checkCartItem, checkAllCartItems } = cartSlice.actions;

  const { enqueueSnackbar } = useSnackbar();

  const isAllChecked = cartItems.data?.every?.((item) => item.checked);
  const checkedItems = cartItems.data?.filter?.((item) => item.checked);

  const onAdd = async (productId: T.Product['productId']) => {
    const cartItemIds = cartItems.data.map((cartItem) => cartItem.productId);

    if (cartItemIds.includes(productId)) {
      enqueueSnackbar(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    try {
      const response = await dispatch(addCartItem(productId));
      unwrapResult(response);

      dispatch(getCartItems());
      enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
    } catch (error) {
      enqueueSnackbar(error);
    }
  };

  const onDeleteItem = (id: T.CartItem['cartId']) => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CART_ITEM)) return;

    dispatch(deleteItem(id));
  };

  const onDeleteCheckedItem = () => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CHECKED_CART_ITEMS)) return;

    const ids = checkedItems?.map((item) => item.cartId);
    dispatch(deleteCheckedItems(ids));
  };

  const onCheck = (cartId: number, checked: boolean) => {
    dispatch(checkCartItem({ cartId, checked }));
  };

  const onCheckAll = () => {
    dispatch(checkAllCartItems({ checked: !isAllChecked }));
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return { cartItems, checkedItems, isAllChecked, onAdd, onDeleteItem, onDeleteCheckedItem, onCheck, onCheckAll };
};

export default useCart;
