import { useRecoilCallback } from 'recoil';
import mockServerClient from '../api';
import cartState from '../recoil/atoms/cartState';
import type { Product } from '../type';

const useCartProduct = (productId: Product['id']) => {
  const setQuantity = useRecoilCallback(
    ({ set }) =>
      (quantity: number) => {
        set(cartState, (cart) => {
          const cartProduct = cart.find((it) => it.productId === productId) ?? null;

          if (cartProduct === null) {
            mockServerClient.post('/cart-items', { productId });

            const newCartItem = {
              id: Math.round(Math.random() * 100000),
              quantity,
              productId,
            };
            return [...cart, newCartItem];
          }

          if (quantity === 0) {
            mockServerClient.delete(`/cart-items`, productId);
          }
          if (quantity > 0) mockServerClient.patch(`/cart-items`, productId, { quantity });

          const cartProductIndex = cart.findIndex((it) => it.id === cartProduct.id);
          const updatedCartItem = {
            ...cartProduct,
            quantity,
          };

          const newCart = [
            ...cart.slice(0, cartProductIndex),
            updatedCartItem,
            ...cart.slice(cartProductIndex + 1),
          ].filter((it) => it.quantity > 0);

          return newCart;
        });
      },
    [productId],
  );

  return { setQuantity };
};

export default useCartProduct;
