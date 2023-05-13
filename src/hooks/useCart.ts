import { useEffect, useRef, useState } from 'react';
import { useRecoilCallback } from 'recoil';

import { cartListState } from '../store/cart';
import { ProductItemData } from '../types';

const useCartAddition = (productId: ProductItemData['id']) => {
  const [isAdded, setIsAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isAdded) {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  }, [isAdded]);

  const setCartItemQuantity = useRecoilCallback(
    ({ set }) =>
      (quantity: number) => {
        set(cartListState, (cartList) => {
          setIsAdded(true);

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

  return { isAdded, setCartItemQuantity };
};

export { useCartAddition };
