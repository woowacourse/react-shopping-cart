import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, productSelector } from '../recoil';
import { CartItem } from '../types';
import { FIRST_INDEX, ONE_ITEM_IN_CART } from '../constants';

export const useSetCart = (id: number) => {
  const setCart = useSetRecoilState(cartState);
  const selectedProduct = useRecoilValue(productSelector(id));

  const findCartItemIndex = (prev: CartItem[]) => {
    const cart = [...prev];
    const cartItemIndex = prev.findIndex((item) => item.id === id);
    const alreadyHasCartItem = cartItemIndex >= FIRST_INDEX;

    return { cart, cartItemIndex, alreadyHasCartItem };
  };

  const removeProduct = (cart: CartItem[], cartItemIndex: number) => {
    cart.splice(cartItemIndex, ONE_ITEM_IN_CART);

    return cart;
  };

  const updateCart = (prev: CartItem[], value: string) => {
    return [
      ...prev,
      {
        id: id,
        quantity: Number(value),
        product: selectedProduct,
      },
    ];
  };

  const addToCart = (value: string) => {
    setCart((prev: CartItem[]) => {
      const { cart, cartItemIndex, alreadyHasCartItem } = findCartItemIndex(prev);

      if (value === '') return removeProduct(cart, cartItemIndex);

      if (alreadyHasCartItem) {
        const updatedItem = { ...prev[cartItemIndex], quantity: Number(value) };
        cart[cartItemIndex] = updatedItem;

        return cart;
      }

      return updateCart(prev, value);
    });
  };

  const removeItemFromCart = () => {
    setCart((prev: CartItem[]) => {
      const { cart, cartItemIndex, alreadyHasCartItem } = findCartItemIndex(prev);

      if (alreadyHasCartItem) return removeProduct(cart, cartItemIndex);

      return prev;
    });
  };

  return { addToCart, removeItemFromCart };
};
