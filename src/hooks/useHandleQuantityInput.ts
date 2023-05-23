import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { MAX_NUMBER_LENGTH, QUANTITY } from '../constants';

interface Props {
  setIsSelected: (value: SetStateAction<boolean>) => void;
  removeItemFromCart: () => void;
  setQuantity: Dispatch<string | number>;
  updateCart: (value: string) => void;
}

export const useHandleQuantityInput = ({ ...props }: Props) => {
  const { setIsSelected, removeItemFromCart, setQuantity, updateCart } = props;

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === String(QUANTITY.NONE)) {
      setIsSelected(false);
      removeItemFromCart();

      return setQuantity(QUANTITY.INITIAL);
    }

    const onlyTwoDigits = value.slice(0, MAX_NUMBER_LENGTH);
    setQuantity(onlyTwoDigits);
    updateCart(onlyTwoDigits);
  };

  return handleNumberInputChange;
};
