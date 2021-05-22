import { useEffect, useState } from 'react';
import { CART_ITEM_MIN_QUANTITY } from '../constants/cart';
import { NETWORK_ERROR } from '../constants/error';
import { cartAction } from '../states/slices/cart/slice';
import {
  thunkFetchCartItems,
  thunkAddItemToCart,
  thunkDeleteCartItem,
  thunkDeleteCartItems,
} from '../states/slices/cart/thunk';
import { useAppDispatch, useAppSelector } from '../states/store';
import { CartId, CartItem, Product } from '../types';

const useCart = () => {
  const dispatch = useAppDispatch();
  const [
    cartItems,
    hasError,
    isLoading,
    userName,
  ] = useAppSelector(({ cart: { items, error, isLoading }, login: { userName } }) => [
    items,
    error,
    isLoading,
    userName,
  ]);

  useEffect(() => {
    if (!hasError) return;

    throw new Error(NETWORK_ERROR);
  }, [hasError]);

  const fetchCartItems = () => {
    dispatch(thunkFetchCartItems(userName));
  };

  const addItem = (product: Product) => {
    // TODO: 이미 카드에 담긴 거 처리하는 로직

    // const CartItem = CartItems.find((CartItem) => CartItem.cart_id === item.product_id);

    // CartItem
    //   // ? dispatch(thunkChangeItemQuantity(CartItem, CartItem.quantity + 1))
    //   :
    dispatch(thunkAddItemToCart({ userName: userName, product }));
  };

  const deleteItem = (cartId: CartId) => {
    dispatch(thunkDeleteCartItem({ userName: userName, cartId }));
  };

  const changeQuantity = (cartItem: CartItem, quantity: number) => {
    if (quantity < CART_ITEM_MIN_QUANTITY) return;

    dispatch(cartAction.changeItemQuantity({ cartItem, quantity }));
  };

  const changeChecked = (cartId: CartId) => {
    dispatch(cartAction.changeItemChecked(cartId));
  };

  const changeAllChecked = (checked: boolean) => {
    dispatch(cartAction.changeAllItemChecked(checked));
  };

  const deleteCheckedItems = (items: CartItem[]) => {
    dispatch(thunkDeleteCartItems({ userName: userName, items }));
  };

  const totalPrice = cartItems.reduce(
    (acc, { price, quantity, checked }) => (checked ? acc + price * quantity : acc),
    0
  );

  const checkedCartItems = cartItems.filter((item) => item.checked);

  return {
    fetchCartItems,
    addItem,
    changeQuantity,
    deleteItem,
    deleteCheckedItems,
    changeChecked,
    changeAllChecked,
    cartItems,
    checkedCartItems,
    totalPrice,
    isLoading,
  };
};

export default useCart;
