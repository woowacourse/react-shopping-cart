import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CartState } from '../../atoms/AddedCartState';
import { AddToCartCountProps } from '../../types/addToCartCountType';

export const useCartCountState = ({
  id,
  onDeleteCart,
}: AddToCartCountProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedCartStates, setAddedCartStates] = useRecoilState(CartState);

  const increaseCount = useCallback(() => {
    setQuantity(quantity + 1);

    const addedCartList = addedCartStates.map((item) => {
      return item.id === id ? { ...item, quantity: item.quantity + 1 } : item;
    });

    setAddedCartStates(addedCartList);
  }, [quantity]);

  const decreaseCount = useCallback(() => {
    const addedCartList = addedCartStates.map((item) => {
      return item.id === id ? { ...item, quantity: item.quantity - 1 } : item;
    });

    setAddedCartStates(addedCartList);

    if (quantity === 1) {
      onDeleteCart();
    }

    setQuantity(quantity - 1);
  }, [quantity]);

  return { increaseCount, decreaseCount, quantity };
};
