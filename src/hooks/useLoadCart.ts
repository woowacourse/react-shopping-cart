import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { QUANTITY } from '../constants';
import { productInCartSelector } from '../recoil';

export const useLoadCart = (id: number) => {
  const foundProductInCart = useRecoilValue(productInCartSelector(id));
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(
    foundProductInCart ? foundProductInCart.quantity : QUANTITY.INITIAL
  );

  useEffect(() => {
    if (foundProductInCart) setIsSelected(true);
  }, [foundProductInCart]);

  return { isSelected, setIsSelected, quantity, setQuantity };
};
