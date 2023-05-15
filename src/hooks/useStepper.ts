import { ChangeEvent, MouseEvent } from 'react';
import { convertToBoundaryValueIfNotValidRange, isIntegerInput } from '../utils/validator';
import { PRODUCT } from '../constants';

interface Props {
  quantity: number;
  updateQuantity: (quantity: number) => void;
}

export const useStepper = ({ quantity, updateQuantity }: Props) => {
  const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!isIntegerInput(value)) return;

    const count = convertToBoundaryValueIfNotValidRange(
      PRODUCT.MIN_COUNT,
      PRODUCT.MAX_COUNT,
      Number(value)
    );

    updateQuantity(count);
  };

  const handleButtonClick = ({ currentTarget: { name } }: MouseEvent<HTMLButtonElement>) => {
    name === 'increase' ? updateQuantity(quantity + 1) : updateQuantity(quantity - 1);
  };

  return { handleInputChange, handleButtonClick };
};
