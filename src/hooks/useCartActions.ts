import { useRecoilCallback } from 'recoil';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { Product } from '../type';

const useCartActions = () => {
  const setQuantity = useRecoilCallback(({ set }) => (product: Product, quantity: number) => {
    set(cartItemsState, (cartItems) => {
      const cartItem = cartItems.find((cartItem) => cartItem.product.id === product.id) ?? null;

      return cartItem === null
        ? [...cartItems, { product, quantity, unselectedForOrder: false }]
        : cartItems.map((it) => (it.product.id === cartItem.product.id ? { ...it, quantity } : it));
    });
  });

  const deleteCartItems = useRecoilCallback(({ set }) => (productIds: Array<Product['id']>) => {
    set(cartItemsState, (cartItems) =>
      cartItems.filter((cartItem) => productIds.includes(cartItem.product.id)),
    );
  });

  return { setQuantity, deleteCartItems };
};

export default useCartActions;
