import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, productSelector } from '../recoil';
import { CartItem } from '../types';
import { FIRST_INDEX, ONE_ITEM_IN_CART } from '../constants';

export const useSetCart = (id: number) => {
  const setCart = useSetRecoilState(cartState);
  const selectedProduct = useRecoilValue(productSelector(id));

  const findCartItemIndex = (prev: CartItem[]) => {
    const cartItemIndex = prev.findIndex((item) => item.id === id);
    const cart = [...prev];

    return { cartItemIndex, cart };
  };

  const removeProduct = (cart: CartItem[], cartItemIndex: number) => {
    cart.splice(cartItemIndex, ONE_ITEM_IN_CART);

    return cart;
  };

  const addToCart = (value: string) => {
    setCart((prev: CartItem[]) => {
      const { cartItemIndex, cart } = findCartItemIndex(prev);

      if (value === '') return removeProduct(cart, cartItemIndex);

      if (cartItemIndex >= FIRST_INDEX) {
        const updatedItem = { ...prev[cartItemIndex], quantity: Number(value) };
        cart[cartItemIndex] = updatedItem;

        return cart;
      }

      return [
        ...prev,
        {
          id: id,
          quantity: Number(value),
          product: selectedProduct,
        },
      ];
    });
  };

  const removeItemFromCart = () => {
    setCart((prev: CartItem[]) => {
      const { cartItemIndex, cart } = findCartItemIndex(prev);

      if (cartItemIndex >= FIRST_INDEX) return removeProduct(cart, cartItemIndex);

      return prev;
    });
  };

  return { addToCart, removeItemFromCart };
};
