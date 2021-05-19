import { CartItem } from '../../../type';
import NumberInput from '../../commons/NumberInput/NumberInput';
import { isPositiveNumber } from '../../../utils/validation';

export interface Props {
  quantity: CartItem['quantity'];
  maxNumber: number;
  setQuantity: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
}

const ProductQuantityInput = ({ quantity, setQuantity, maxNumber }: Props) => {
  const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!setQuantity) {
      return;
    }

    const { value } = event.target;
    if (value === '') {
      setQuantity('');
      return;
    }

    if (!isPositiveNumber(value) || Number(value) > maxNumber) {
      return;
    }

    setQuantity(String(value));
  };

  const onQuantityIncrease = () => {
    setQuantity?.(String(Number(quantity) + 1));
  };

  const onQuantityDecrease = () => {
    const newValue = isPositiveNumber(Number(quantity) - 1) ? String(Number(quantity) - 1) : quantity;
    setQuantity?.(newValue);
  };

  return (
    <NumberInput
      value={quantity}
      onChange={onQuantityChange}
      onDecreaseButtonClick={onQuantityDecrease}
      onIncreaseButtonClick={onQuantityIncrease}
    />
  );
};

export default ProductQuantityInput;
