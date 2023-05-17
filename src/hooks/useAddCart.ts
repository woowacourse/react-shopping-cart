import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { cartState } from '../atoms/cartState';
import { CartType } from '../type/cart';
import useCount from './useCount';

export function useAddCart() {
  const [isSelected, setIsSelected] = useState(false);
  const setCart = useSetRecoilState<CartType[]>(cartState);
  const { count, setCount } = useCount();

  const selectProductItem = () => {
    setIsSelected(true);
  };

  const createChangedCart = (prevCart: CartType[], cartItem: CartType) => {
    const index = prevCart.findIndex(
      (prevItem) => prevItem.productId === cartItem.productId
    );
    if (index === -1) return [...prevCart, cartItem];

    return [
      ...prevCart.slice(0, index),
      cartItem,
      ...prevCart.slice(index + 1),
    ];
  };

  const addCartProductItem = (id: number) => {
    setIsSelected(false);
    const cartItem: CartType = {
      productId: id,
      quantity: count.value,
    };

    setCart((prev) => createChangedCart(prev, cartItem));
  };

  return { isSelected, selectProductItem, addCartProductItem, count, setCount };
}
