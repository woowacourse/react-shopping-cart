import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from './useStore';
import * as T from '../types';
import { addCartItem, CartState, getCartItems } from '../slices/cartSlice';
import MESSAGE from '../constants/messages';

const useCart = (): {
  cartItems: CartState;
  add: (productId: T.Product['productId']) => Promise<void>;
} => {
  const cartItems = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const add = async (productId: T.Product['productId']) => {
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

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return { cartItems, add };
};

export default useCart;
