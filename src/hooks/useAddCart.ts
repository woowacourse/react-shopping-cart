import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { cartState } from '../atoms/cartState';
import { CartType } from '../type/cart';

export function useAddCart() {
  const [isSelected, setIsSelected] = useState(false);
  const quantityRef = useRef<HTMLInputElement>(null);
  const setCart = useSetRecoilState<CartType[]>(cartState);

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
      quantity: 0,
    };

    if (quantityRef.current) {
      cartItem.quantity = +quantityRef.current.value;
    }

    setCart((prev) => createChangedCart(prev, cartItem));
  };

  return { isSelected, selectProductItem, addCartProductItem, quantityRef };
}
