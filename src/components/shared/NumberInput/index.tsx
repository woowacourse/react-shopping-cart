import { NumberInputContainer, IncreaseButton, DecreaseButton } from './style';
import Container from '../Container';
import Input from '../Input';
import { ChangeEvent, useEffect, VFC } from 'react';

interface Props {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
}

const NumberInput: VFC<Props> = ({ value, setValue, min = -Infinity, max = Infinity }) => {
  const isValidInput = (input: number) => input >= min && input <= max;

  const onChangeInput = ({ target: { valueAsNumber } }: ChangeEvent<HTMLInputElement>) => {
    if (!isValidInput(valueAsNumber)) return;

    setValue(valueAsNumber);
  };

  const onClickIncreaseButton = () => {
    if (!isValidInput(value + 1)) return;

    setValue(value + 1);
  };

  const onClickDecreaseButton = () => {
    if (!isValidInput(value - 1)) return;

    setValue(value - 1);
  };

  useEffect(() => {
    if (isValidInput(value)) return;

    throw Error('Invalid value: value should be within min and max range ');
  }, []);

  return (
    <NumberInputContainer>
      <Input type="number" value={value} min={min} max={max} onChange={onChangeInput} />
      <Container>
        <IncreaseButton onClick={onClickIncreaseButton}>
          <img src={process.env.PUBLIC_URL + '/icons/number-input-arrow.svg'} alt="arrow" />
        </IncreaseButton>
        <DecreaseButton onClick={onClickDecreaseButton}>
          <img src={process.env.PUBLIC_URL + '/icons/number-input-arrow.svg'} alt="arrow" />
        </DecreaseButton>
      </Container>
    </NumberInputContainer>
  );
};

export default NumberInput;
