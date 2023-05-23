import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FIRST_INDEX, ONE_ITEM_IN_CART } from '../constants';
import { CART_URL } from '../constants/url';
import { cartState, productSelector } from '../recoil';
import { CartItem } from '../types';
import { useFetchData } from './useFetchData';

export const useSetCart = (id: number) => {
  const setCart = useSetRecoilState(cartState);
  const selectedProduct = useRecoilValue(productSelector(id));

  const { api } = useFetchData();

  const findCartItemIndex = (prev: CartItem[]) => {
    const cart = [...prev];
    const cartItemIndex = prev.findIndex((item) => item.id === id);
    const alreadyHasCartItem = cartItemIndex >= FIRST_INDEX;

    return { cart, cartItemIndex, alreadyHasCartItem };
  };

  const removeProduct = (cart: CartItem[], cartItemIndex: number) => {
    if (cartItemIndex >= FIRST_INDEX) cart.splice(cartItemIndex, ONE_ITEM_IN_CART);

    return cart;
  };

  const updateCart = (value: string) => {
    setCart((prev: CartItem[]) => {
      const { cart, cartItemIndex } = findCartItemIndex(prev);
      const quantity = Number(value);

      api.patch(`${CART_URL}/${id}`, { id, quantity });

      const updatedItem = { ...prev[cartItemIndex], quantity: Number(value) };
      cart[cartItemIndex] = updatedItem;

      return cart;
    });
  };

  const addToCart = (value: string) => {
    setCart((prev: CartItem[]) => {
      const quantity = Number(value);

      const { cart, cartItemIndex } = findCartItemIndex(prev);

      if (value === '') return removeProduct(cart, cartItemIndex);

      api.post(CART_URL, { id });

      return [
        ...prev,
        {
          id: id,
          quantity: quantity,
          product: selectedProduct,
        },
      ];
    });
  };

  const removeItemFromCart = () => {
    setCart((prev: CartItem[]) => {
      const { cart, cartItemIndex, alreadyHasCartItem } = findCartItemIndex(prev);
      api.delete(`${CART_URL}/${id}`, { id });

      if (alreadyHasCartItem) return removeProduct(cart, cartItemIndex);

      return prev;
    });
  };

  return { addToCart, removeItemFromCart, updateCart };
};
