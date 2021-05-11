import { useEffect } from 'react';
import { CART_ITEM_MIN_QUANTITY } from '../constants/cart';
import { NETWORK_ERROR } from '../constants/error';
import {
  thunkAddItemToCart,
  thunkGetCartItems,
  thunkChangeItemQuantity,
  thunkDeleteCartItem,
  thunkChangeItemChecked,
  thunkChangeAllItemChecked,
  thunkDeleteCheckedCartItem,
  thunkClearCart,
} from '../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../states/store';
import { ItemInCart, Product } from '../types';

const useFetchCartRedux = () => {
  const dispatch = useAppDispatch();
  const [
    itemsInCart,
    hasError,
    isLoading,
  ] = useAppSelector(({ cart: { items, error, isLoading } }) => [items, error, isLoading]);

  useEffect(() => {
    if (!hasError) return;

    throw new Error(NETWORK_ERROR);
  }, [hasError]);

  const doFetch = () => {
    dispatch(thunkGetCartItems());
  };

  const addItem = (item: Product) => {
    const itemInCart = itemsInCart.find((itemInCart) => itemInCart.id === item.id);

    if (itemInCart) {
      dispatch(thunkChangeItemQuantity(itemInCart, itemInCart.quantity + 1));
      return;
    }

    dispatch(thunkAddItemToCart(item));
  };

  const changeQuantity = (item: ItemInCart, quantity: number) => {
    if (quantity < CART_ITEM_MIN_QUANTITY) return;

    dispatch(thunkChangeItemQuantity(item, quantity));
  };

  const changeChecked = (item: ItemInCart) => {
    dispatch(thunkChangeItemChecked(item));
  };

  const changeAllChecked = (checked: boolean) => {
    dispatch(thunkChangeAllItemChecked(itemsInCart, checked));
  };

  const deleteItem = (itemId: string) => {
    dispatch(thunkDeleteCartItem(itemId));
  };

  const deleteCheckedItems = (items: ItemInCart[]) => {
    dispatch(thunkDeleteCheckedCartItem(items));
  };

  const clearCart = () => {
    dispatch(thunkClearCart());
  };

  return {
    doFetch,
    addItem,
    changeQuantity,
    deleteItem,
    deleteCheckedItems,
    changeChecked,
    changeAllChecked,
    clearCart,
    itemsInCart,
    isLoading,
  };
};

export default useFetchCartRedux;
