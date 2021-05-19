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
import { CartItem, Product } from '../types';

const useCart = () => {
  const dispatch = useAppDispatch();
  const [
    CartItems,
    hasError,
    isLoading,
  ] = useAppSelector(({ cart: { items, error, isLoading } }) => [items, error, isLoading]);

  useEffect(() => {
    if (!hasError) return;

    throw new Error(NETWORK_ERROR);
  }, [hasError]);

  const fetchCartItems = () => {
    dispatch(thunkGetCartItems());
  };

  const addItem = (item: Product) => {
    const CartItem = CartItems.find((CartItem) => CartItem.id === item.id);

    CartItem
      ? dispatch(thunkChangeItemQuantity(CartItem, CartItem.quantity + 1))
      : dispatch(thunkAddItemToCart(item));
  };

  const changeQuantity = (item: CartItem, quantity: number) => {
    if (quantity < CART_ITEM_MIN_QUANTITY) return;

    dispatch(thunkChangeItemQuantity(item, quantity));
  };

  const changeChecked = (item: CartItem) => {
    dispatch(thunkChangeItemChecked(item));
  };

  const changeAllChecked = (checked: boolean) => {
    dispatch(thunkChangeAllItemChecked(CartItems, checked));
  };

  const deleteItem = (itemId: string) => {
    dispatch(thunkDeleteCartItem(itemId));
  };

  const deleteCheckedItems = (items: CartItem[]) => {
    dispatch(thunkDeleteCheckedCartItem(items));
  };

  const clearCart = () => {
    dispatch(thunkClearCart());
  };

  return {
    fetchCartItems,
    addItem,
    changeQuantity,
    deleteItem,
    deleteCheckedItems,
    changeChecked,
    changeAllChecked,
    clearCart,
    CartItems,
    isLoading,
  };
};

export default useCart;
