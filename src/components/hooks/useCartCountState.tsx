import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../atoms/CartState';
import { CartCountProps } from '../../types/CartCountType';

export const useCartCountState = ({ id, onDeleteCart }: CartCountProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedCartStates, setAddedCartStates] = useRecoilState(cartState);

  const increaseCount = useCallback(() => {
    setQuantity(quantity + 1);

    const cartList = addedCartStates.map((item) => {
      return item.id === id ? { ...item, quantity: item.quantity + 1 } : item;
    });

    setAddedCartStates(cartList);
  }, [quantity]);

  const decreaseCount = useCallback(() => {
    const cartList = addedCartStates.map((item) => {
      return item.id === id ? { ...item, quantity: item.quantity - 1 } : item;
    });

    setAddedCartStates(cartList);

    if (quantity === 1) {
      onDeleteCart();
    }

    setQuantity(quantity - 1);
  }, [quantity]);

  return { increaseCount, decreaseCount, quantity };
};
