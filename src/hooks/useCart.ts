import { useCallback, useEffect } from 'react';
import { SerializedError, unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import MESSAGE from '../constants/messages';
import { addCartItem, getCartItems } from '../slices/cartSlice';
import { useAppDispatch, useAppSelector } from './useStore';
import * as T from '../types';

const useCart = (): {
  data: T.CartItem[];
  status: T.AsyncStatus;
  error: SerializedError | null;
  addItem: (productId: T.ProductId) => void;
} => {
  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { data, status, error } = cartItems;

  const addItem = async (productId: T.ProductId) => {
    const cartItemIds = data.map((cartItem) => cartItem.productId);

    if (cartItemIds.includes(productId)) {
      enqueueSnackbar(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    try {
      const response = await dispatch(addCartItem(productId));
      unwrapResult(response);

      dispatch(getCartItems());
      enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
    } catch (err) {
      enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_FAILURE);
    }
  };

  const getItem = useCallback(async () => {
    const resultAction = await dispatch(getCartItems());

    if (getCartItems.rejected.match(resultAction)) {
      enqueueSnackbar(MESSAGE.GET_CART_ITEMS_FAILURE);
    }
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  return { data, status, error, addItem };
};

export default useCart;
