import type { CallbackInterface } from 'recoil';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import mockServerClient from '../api';
import cartState from '../recoil/atoms/cartState';
import type { Product } from '../type';

const useCartProduct = (productId: Product['id']) => {
  const carts = useRecoilValue(cartState);
  const setQuantity = useRecoilCallback(
    ({ set }: CallbackInterface) =>
      async (quantity: number) => {
        const cartItem = carts.find((it) => it.productId === productId) ?? null;
        try {
          if (cartItem === null) {
            await mockServerClient.post(`/cart-items`, { productId });
          }
          if (quantity === 0) {
            await mockServerClient.delete(`/cart-items`, productId);
          } else {
            await mockServerClient.patch(`/cart-items`, productId, { quantity });
          }

          set(cartState, (cart) => {
            const cartProduct = cart.find((it) => it.productId === productId) ?? null;

            if (cartProduct === null) {
              const newCartItem = {
                id: Math.round(Math.random() * 100000),
                quantity,
                productId,
              };
              return [...cart, newCartItem];
            }

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
        } catch (error) {
          console.log(error);
          window.alert('상품을 처리하는 도중 오류가 발생했습니다.');
        }
      },
  );

  return { setQuantity };
};

export default useCartProduct;
