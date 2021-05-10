import { useEffect, useState } from 'react';
import {
  thunkAddItemToCart,
  thunkGetCartItems,
  thunkChangeItemQuantity,
  thunkDeleteCartItem,
  thunkChangeItemChecked,
  thunkChangeAllItemChecked,
  thunkDeleteCheckedCartItem,
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

  //TODO: items 바로 불러와서 인자로받지 말게하기
  const changeAllChecked = (items: ItemInCart[], checked: boolean) => {
    dispatch(thunkChangeAllItemChecked(items, checked));
  };

  const deleteItem = (itemId: string) => {
    dispatch(thunkDeleteCartItem(itemId));
  };

  const deleteCheckedItems = (items: ItemInCart[]) => {
    dispatch(thunkDeleteCheckedCartItem(items));
  };

  return {
    doFetch,
    addItem,
    changeQuantity,
    deleteItem,
    deleteCheckedItems,
    changeChecked,
    changeAllChecked,
  };
};

export default useFetchCartRedux;
