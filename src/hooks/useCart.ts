import { useEffect } from 'react';
import { CART_ITEM_MIN_QUANTITY } from '../constants/cart';
import { NETWORK_ERROR } from '../constants/error';
import {
  thunkAddItemToCart,
  thunkGetCartItems,
  thunkDeleteCartItem,
  changeItemChecked,
  changeAllItemChecked,
  thunkDeleteCheckedItems,
  thunkClearCart,
  changeCartItemQuantity,
} from '../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../states/store';
import { CartId, CartItem, Product } from '../types';

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
    try {
      dispatch(thunkGetCartItems('jho2301'));
    } catch (error) {
      throw new Error(NETWORK_ERROR);
    }
  };

  const addItem = (item: Product) => {
    // const CartItem = CartItems.find((CartItem) => CartItem.cart_id === item.product_id);

    // CartItem
    //   // ? dispatch(thunkChangeItemQuantity(CartItem, CartItem.quantity + 1))
    //   :
    dispatch(thunkAddItemToCart('jho2301', item));
  };

  const deleteItem = (cartId: CartId) => {
    dispatch(thunkDeleteCartItem('jho2301', cartId));
  };

  const changeQuantity = (item: CartItem, quantity: number) => {
    if (quantity < CART_ITEM_MIN_QUANTITY) return;

    dispatch(changeCartItemQuantity(item, quantity));
  };

  const changeChecked = (cartId: CartId) => {
    dispatch(changeItemChecked(cartId));
  };

  const changeAllChecked = (checked: boolean) => {
    dispatch(changeAllItemChecked(checked));
  };

  const deleteCheckedItems = (items: CartItem[]) => {
    dispatch(thunkDeleteCheckedItems('jho2301', items));
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
