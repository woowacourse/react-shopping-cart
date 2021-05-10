import { useEffect, useState } from 'react';
import {
  thunkAddItemToCart,
  thunkGetCartItems,
  thunkChangeItemQuantity,
  thunkDeleteCartItem,
  thunkChangeItemChecked,
  thunkChangeAllItemChecked,
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

  const changeChecked = (item: ItemInCart) => {
    dispatch(thunkChangeItemChecked(item));
  };

  const changeAllChecked = (items: ItemInCart[], checked: boolean) => {
    dispatch(thunkChangeAllItemChecked(items, checked));
  };

  const deleteItem = (itemId: string) => {
    dispatch(thunkDeleteCartItem(itemId));
  };

  return { doFetch, addItem, changeQuantity, deleteItem, changeChecked, changeAllChecked };
};

export default useFetchCartRedux;
