import UpTriangle from '../../../assets/triangle.svg';
import DownTriangle from '../../../assets/triangle-down.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import * as Styled from './StepperInput.styles';

type StepperInputProps = {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  getValue: (value: number) => void;
};

export const regEx = {
  Number: /^[0-9]+$/,
};

export const isNumber = (target: string) => {
  return regEx.Number.test(target);
};

const StepperInput = ({ min = 0, max = 99, step = 1, initialValue = 0, getValue }: StepperInputProps) => {
  const [inputValue, setInputValue] = useState(String(initialValue));

  useEffect(() => {
    if (inputValue !== '') getValue(Number(inputValue));
  }, [getValue, inputValue]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') setInputValue('');
    if (!isNumber(e.target.value)) return;

    const currentValue = Number(e.target.value);

    if (currentValue >= min && currentValue <= max) setInputValue(String(currentValue));
  };

  const handleBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') setInputValue(String(min));
  };

  const handleIncreaseStepper = () => {
    const NextValue = Number(inputValue) + step;

    if (NextValue <= max) setInputValue(String(NextValue));
  };

  const handleDecreaseStepper = () => {
    const NextValue = Number(inputValue) - step;

    if (NextValue >= min) setInputValue(String(NextValue));
  };

  return (
    <Styled.StepperInputWrapper>
      <Styled.Input type='text' value={inputValue} onChange={handleChangeInput} onBlur={handleBlurInput} />
      <Styled.StepperWrapper>
        <Styled.Stepper type='button' onClick={handleIncreaseStepper}>
          <img src={UpTriangle} alt='수량올리기' />
        </Styled.Stepper>
        <Styled.Stepper type='button' onClick={handleDecreaseStepper}>
          <img src={DownTriangle} alt='수량내리기' />
        </Styled.Stepper>
      </Styled.StepperWrapper>
    </Styled.StepperInputWrapper>
  );
};

export default StepperInput;
