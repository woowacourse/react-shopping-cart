import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState } from '../components/ProductItem';
import { productListState } from '../components/ProductList';
import { CartItem, Product } from '../types';
import { CART_ITEM_EXISTS, ONE_ITEM_IN_CART } from '../constants';

export const useSetCart = (id: number) => {
  const productList = useRecoilValue<Product[]>(productListState);
  const setCart = useSetRecoilState<CartItem[]>(cartState);

  const findCartItemIndexAndUpdatedCart = (prev: CartItem[]) => {
    const cartItemIndex = prev.findIndex((item) => item.id === id);
    const updatedCart = [...prev];

    return { cartItemIndex, updatedCart };
  };

  const addToCart = (value: string) =>
    setCart((prev: CartItem[]) => {
      const { cartItemIndex, updatedCart } = findCartItemIndexAndUpdatedCart(prev);

      if (cartItemIndex >= CART_ITEM_EXISTS) {
        const updatedItem = { ...prev[cartItemIndex], quantity: Number(value) };
        updatedCart[cartItemIndex] = updatedItem;

        return updatedCart;
      }

      return [
        ...prev,
        {
          id: id,
          quantity: Number(value),
          product: productList.filter((item) => item.id === id),
        },
      ];
    });

  const removeProductItemFromCart = () =>
    setCart((prev: CartItem[]) => {
      const { cartItemIndex, updatedCart } = findCartItemIndexAndUpdatedCart(prev);

      if (cartItemIndex >= CART_ITEM_EXISTS) {
        updatedCart.splice(cartItemIndex, ONE_ITEM_IN_CART);

        return updatedCart;
      }

      return prev;
    });

  return { addToCart, removeProductItemFromCart };
};
