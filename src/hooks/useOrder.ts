import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SerializedError } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import MESSAGE from '../constants/messages';
import { addOrder, getOrders, OrderAttribute } from '../slices/orderSlice';
import { useAppDispatch, useAppSelector } from './useStore';
import * as T from '../types';
import ROUTES from '../constants/routes';

const useOrder = (): {
  data: T.Order[];
  status: T.AsyncStatus;
  error: SerializedError | null;
  addItem: (checkedItems: T.CartItem[]) => Promise<void>;
} => {
  const orders = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { data, status, error } = orders;

  const getItem = useCallback(async () => {
    const resultAction = await dispatch(getOrders());

    if (getOrders.rejected.match(resultAction)) {
      enqueueSnackbar(resultAction?.payload?.message || MESSAGE.GET_ORDERS_FAILURE);
    }
  }, [dispatch, enqueueSnackbar]);

  const addItem = async (checkedItems: T.CartItem[]) => {
    const cartItems: OrderAttribute[] = checkedItems.map((item) => ({
      cart_id: item.cartId,
      quantity: item.quantity,
    }));

    const resultAction = await dispatch(addOrder(cartItems));

    if (addOrder.rejected.match(resultAction)) {
      enqueueSnackbar(MESSAGE.PURCHASE_CART_ITEMS_FAILURE);
      return;
    }

    if (addOrder.fulfilled.match(resultAction)) {
      history.replace(ROUTES.ORDER_COMPLETE);
    }
  };

  useEffect(() => {
    getItem();
  }, [getItem]);

  return { data, status, error, addItem };
};

export default useOrder;
