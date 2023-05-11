import { useRecoilCallback } from 'recoil';
import cartState from '../recoil/atoms/cartState';
import type { Product } from '../type';

const useCartProduct = (productId: Product['id']) => {
  const setQuantity = useRecoilCallback(
    ({ set }) =>
      (quantity: number) => {
        set(cartState, (cart) => {
          const cartProduct = cart.find((it) => it.productId === productId) ?? null;

          if (cartProduct === null) {
            return [...cart, { id: Math.round(Math.random() * 100000), quantity, productId }];
          }

          const cartProductIndex = cart.findIndex((it) => it.id === cartProduct.id);
          const newCart = [
            ...cart.slice(0, cartProductIndex),
            {
              ...cartProduct,
              quantity,
            },
            ...cart.slice(cartProductIndex + 1),
          ].filter((it) => it.quantity > 0);

          return newCart;
        });
      },
    [],
  );

  return { setQuantity };
};

export default useCartProduct;
