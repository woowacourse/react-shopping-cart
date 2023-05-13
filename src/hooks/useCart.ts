import { useRecoilCallback } from 'recoil';

import { cartListState } from '../store/cart';
import { ProductItemData } from '../types';

const useCart = () => {
  const setCartItemQuantity = useRecoilCallback(
    ({ set }) =>
      (productId: ProductItemData['id'], quantity: number) => {
        set(cartListState, (cartList) => {
          const selectedCartItemIndex = cartList.findIndex(
            (cartItem) => cartItem.productId === productId
          );

          if (selectedCartItemIndex === -1) {
            const newCartId = Number(new Date());

            return [...cartList, { id: newCartId, quantity, productId }];
          }

          const updatedCartList = [
            ...cartList.slice(0, selectedCartItemIndex),
            {
              ...cartList[selectedCartItemIndex],
              quantity,
            },
            ...cartList.slice(selectedCartItemIndex + 1),
          ].filter((cartItem) => cartItem.quantity > 0);

          return updatedCartList;
        });
      },
    []
  );

  return { setCartItemQuantity };
};

export { useCart };
