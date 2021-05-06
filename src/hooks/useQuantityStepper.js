import { useState } from 'react';
import { patternOnlyNumber } from '../constants';

export const useQuantityStepper = (
  initialState = 1,
  { minQuantity = 1, maxQuantity = 99, quantityDiff = 1 } = {}
) => {
  const [quantity, setQuantity] = useState(initialState);

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;

    if ((quantity < minQuantity && quantity !== '') || quantity > maxQuantity) {
      return;
    }

    setQuantity(() => quantity.replace(patternOnlyNumber, ''));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => Number(prevQuantity) + quantityDiff);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) =>
      prevQuantity <= minQuantity ? minQuantity : Number(prevQuantity) - quantityDiff
    );
  };

  return { quantity, handleQuantityChange, handleIncrement, handleDecrement };
};
