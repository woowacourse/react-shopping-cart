import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { cartState } from '../../atoms/CartState';
import { CartCountProps } from '../../types/CartCountType';

export const useCartCountState = ({ id, onDeleteCart }: CartCountProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const setCartStates = useSetRecoilState(cartState);

  const increaseCount = useCallback(() => {
    setQuantity(quantity + 1);

    setCartStates((prevCartStates) =>
      prevCartStates.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  }, [quantity]);

  const decreaseCount = useCallback(() => {
    setCartStates((prevCartStates) =>
      prevCartStates.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );

    if (quantity === 1) {
      onDeleteCart();
    }

    setQuantity(quantity - 1);
  }, [quantity]);

  return { increaseCount, decreaseCount, quantity };
};
