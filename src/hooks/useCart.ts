import { useEffect } from 'react';
import { CART_ITEM_MIN_QUANTITY } from '../constants/cart';
import { NETWORK_ERROR } from '../constants/error';
import {
  changeAllItemChecked,
  changeItemChecked,
  changeItemQuantity,
} from '../states/slices/cart/slice';

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
    CartItems,
    hasError,
    isLoading,
  ] = useAppSelector(({ cart: { items, error, isLoading } }) => [items, error, isLoading]);

  useEffect(() => {
    if (!hasError) return;

    throw new Error(NETWORK_ERROR);
  }, [hasError]);

  const fetchCartItems = () => {
    dispatch(thunkFetchCartItems('jho2301'));
  };

  const addItem = (product: Product) => {
    // TODO: 이미 카드에 담긴 거 처리하는 로직

    // const CartItem = CartItems.find((CartItem) => CartItem.cart_id === item.product_id);

    // CartItem
    //   // ? dispatch(thunkChangeItemQuantity(CartItem, CartItem.quantity + 1))
    //   :
    dispatch(thunkAddItemToCart({ userName: 'jho2301', product }));
  };

  const deleteItem = (cartId: CartId) => {
    dispatch(thunkDeleteCartItem({ userName: 'jho2301', cartId }));
  };

  const changeQuantity = (cartItem: CartItem, quantity: number) => {
    if (quantity < CART_ITEM_MIN_QUANTITY) return;

    dispatch(changeItemQuantity({ cartItem, quantity }));
  };

  const changeChecked = (cartId: CartId) => {
    dispatch(changeItemChecked(cartId));
  };

  const changeAllChecked = (checked: boolean) => {
    dispatch(changeAllItemChecked(checked));
  };

  const deleteCheckedItems = (items: CartItem[]) => {
    dispatch(thunkDeleteCartItems({ userName: 'jho2301', items }));
  };

  return {
    fetchCartItems,
    addItem,
    changeQuantity,
    deleteItem,
    deleteCheckedItems,
    changeChecked,
    changeAllChecked,
    CartItems,
    isLoading,
  };
};

export default useCart;
