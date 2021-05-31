import { useState } from 'react';
import { requestDeleteCartItem } from '../apis';
import { requestDeleteCartItems, requestGetCartItems } from '../apis/cart';
import { CartItem, Product } from '../type';
import { parseCartItemDataList } from '../utils/parseData';
import useRequest from './useRequest';

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { loading, responseOK } = useRequest(async () => {
    const response = await requestGetCartItems();
    setCartItems(parseCartItemDataList(response.data));
  });

  const getCartItem = (id: CartItem['id']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);

    return newCartItems[targetIndex];
  };

  const deleteCartItem = async (id: CartItem['id']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);

    await requestDeleteCartItem(id);
    newCartItems.splice(targetIndex, 1);
    setCartItems(newCartItems);
  };

  const deleteAllCartItems = async () => {
    const selectedCartItemIdList = cartItems.filter(item => item.isSelected).map(item => item.id);
    await requestDeleteCartItems(selectedCartItemIdList);
    const newCartItems = cartItems.filter(cartItem => !selectedCartItemIdList.includes(cartItem.id));
    setCartItems(newCartItems);
  };

  const setCartItemSelected = (id: CartItem['id'], isSelected: CartItem['isSelected']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);
    const newCartItem = { ...newCartItems[targetIndex], isSelected };
    newCartItems.splice(targetIndex, 1, newCartItem);
    setCartItems(newCartItems);
  };

  const setAllCartItemSelected = (isChecked: boolean) => {
    const newCartItems = cartItems.map(cartItem => ({ ...cartItem, isSelected: !isChecked }));
    setCartItems(newCartItems);
  };

  const setCartItemQuantity = async (id: CartItem['id'], quantity: CartItem['quantity']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);
    const newCartItem = { ...newCartItems[targetIndex], quantity };
    newCartItems.splice(targetIndex, 1, newCartItem);
    setCartItems(newCartItems);
  };

  const getSelectedCartItems = () => {
    return cartItems.filter(item => item.isSelected);
  };

  const totalCartItemPrice = String(
    cartItems.reduce((acc, cartItem) => {
      if (!cartItem.isSelected) {
        return acc;
      }

      return acc + Number(cartItem.price) * Number(cartItem.quantity);
    }, 0)
  );

  const isCartHasProduct = (name: Product['name']) => {
    return cartItems.find(cartItem => cartItem.name === name);
  };

  return {
    cartItems,
    loading,
    responseOK,
    totalCartItemPrice,
    getCartItem,
    setCartItems,
    deleteCartItem,
    deleteAllCartItems,
    isCartHasProduct,
    setCartItemSelected,
    setAllCartItemSelected,
    setCartItemQuantity,
    getSelectedCartItems,
  };
};

export default useCart;
