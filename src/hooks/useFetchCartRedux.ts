import { useEffect, useState } from 'react';
import {
  thunkAddItemToCart,
  thunkGetCartItems,
  thunkChangeItemQuantity,
} from '../states/actions/cart';
import { useAppDispatch } from '../states/store';
import { ItemInCart, Product } from '../types';

const useFetchCartRedux = () => {
  const dispatch = useAppDispatch();

  const doFetch = () => {
    dispatch(thunkGetCartItems());
  };

  const addItem = (item: Product) => {
    dispatch(thunkAddItemToCart(item));
  };

  const changeQuantity = (item: ItemInCart, quantity: number) => {
    // TODO : 상수화
    const CART_ITEM_MIN_QUANTITY = 1;

    if (quantity < CART_ITEM_MIN_QUANTITY) return;

    dispatch(thunkChangeItemQuantity(item, quantity));
  };

  return { doFetch, addItem, changeQuantity };
};

export default useFetchCartRedux;
