import type { ChangeEvent } from 'react';
import styled from '@emotion/styled';

interface InputStepperProps {
  size: 'small' | 'big';
  quantity: number;
  setQuantity: (value: number) => void;
}

const isInputValueDigit = (inputValue: string): boolean => {
  return /^\d*$/.test(inputValue);
};

const InputStepper = ({ size, quantity, setQuantity }: InputStepperProps) => {
  const handleOnChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!isInputValueDigit(inputValue)) return;
    if (inputValue.length < 1 || inputValue.length > 2) return;

    if (Number(inputValue) === quantity) return;

    setQuantity(Number(inputValue));
  };

  const handleOnClickStepperUpButton = () => {
    setQuantity(quantity + 1);
  };

  const handleOnClickStepperDownButton = () => {
    setQuantity(quantity - 1);
  };

  return (
    <InputStepperWrapper>
      <InputStyle $size={size} type="text" value={quantity} onChange={handleOnChangeText} />
      <StepperButtonWrapper>
        <StepperUpButton $size={size} onClick={handleOnClickStepperUpButton}>
          &#9662;
        </StepperUpButton>
        <StepperDownButton $size={size} onClick={handleOnClickStepperDownButton}>
          &#9662;
        </StepperDownButton>
      </StepperButtonWrapper>
    </InputStepperWrapper>
  );
};

export default InputStepper;

const InputStepperWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputStyle = styled.input<{ $size: InputStepperProps['size'] }>`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  width: ${({ $size }) => ($size === 'small' ? '41.6' : '66')}px;
  height: ${({ $size }) => ($size === 'small' ? '28' : '50')}px;

  border: 1px solid #dddddd;
  text-align: center;

  outline: none;

  font-weight: 400;
  font-size: ${({ $size }) => ($size === 'small' ? '12' : '24')}px;
  line-height: 19px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const StepperButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StepperDownButton = styled.button<{ $size: InputStepperProps['size'] }>`
  width: ${({ $size }) => ($size === 'small' ? '23.93' : '33')}px;
  height: ${({ $size }) => ($size === 'small' ? '14' : '25')}px;
  border: 1px solid #dddddd;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: ${({ $size }) => ($size === 'small' ? '12' : '24')}px;
`;

const StepperUpButton = styled(StepperDownButton)`
  transform: scaleY(-1);
`;
