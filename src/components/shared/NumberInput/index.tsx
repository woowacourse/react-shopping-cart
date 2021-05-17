import { ChangeEvent, InputHTMLAttributes, useEffect, useState, FC } from 'react';
import { NumberInputContainer, IncreaseButton, DecreaseButton } from './style';
import Container from '../Container';
import Input from '../Input';
import { CART_ITEM_MIN_QUANTITY } from '../../../constants/cart';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: number;
  setValue: (value: number) => void;
}

const NumberInput: FC<Props> = ({ value, setValue, min = -Infinity, max = Infinity }) => {
  const [num, setNum] = useState(value);

  useEffect(() => {
    if (!isValidInput(value)) {
      throw Error('Invalid value: value should be within min and max range ');
    }

    setNum(value);
  }, [value]);

  const isValidInput = (input: number) => input >= min && input <= max;

  const onChangeInput = ({ target: { valueAsNumber } }: ChangeEvent<HTMLInputElement>) => {
    setNum(valueAsNumber);
  };

  const onBlurInput = () => {
    if (!isValidInput(num)) {
      setNum(value);
      return;
    }

    setValue(num);
  };

  const onClickIncreaseButton = () => {
    if (!isValidInput(value + 1)) return;

    setValue(value + 1);
  };

  const onClickDecreaseButton = () => {
    if (!isValidInput(value - 1)) return;

    setValue(value - 1);
  };

  return (
    <NumberInputContainer>
      <Input
        type="number"
        value={num}
        min={min}
        max={max}
        onChange={onChangeInput}
        onBlur={onBlurInput}
        data-testid="quantity-input"
      />
      <Container>
        <IncreaseButton type="button" data-testid="increase-button" onClick={onClickIncreaseButton}>
          <img src={process.env.PUBLIC_URL + '/icons/number-input-arrow.svg'} alt="arrow" />
        </IncreaseButton>
        <DecreaseButton type="button" data-testid="decrease-button" onClick={onClickDecreaseButton}>
          <img src={process.env.PUBLIC_URL + '/icons/number-input-arrow.svg'} alt="arrow" />
        </DecreaseButton>
      </Container>
    </NumberInputContainer>
  );
};

export default NumberInput;
