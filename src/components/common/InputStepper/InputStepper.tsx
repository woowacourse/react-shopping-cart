import type { ChangeEvent } from 'react';
import styled from '@emotion/styled';

interface InputStepperProps {
  size: 'small' | 'big';
  quantity: number;
  setQuantity: (value: number) => void;
}

const InputStepper = ({ size, quantity, setQuantity }: InputStepperProps) => {
  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^\d{1,2}$/.test(e.target.value)) return;

    if (Number(e.target.value) !== quantity) {
      setQuantity(Number(e.target.value));
    }
  };

  return (
    <InputStepperWrapper>
      <InputStyle $size={size} type="text" value={quantity} onChange={changeText} />
      <StepperButtonWrapper>
        <StepperUpButton $size={size} onClick={() => setQuantity(quantity + 1)}>
          &#9662;
        </StepperUpButton>
        <StepperDownButton $size={size} onClick={() => setQuantity(quantity - 1)}>
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

  width: ${({ $size }) => ($size === 'small' ? '41.6' : '73')}px;
  height: ${({ $size }) => ($size === 'small' ? '28' : '60')}px;

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
  width: ${({ $size }) => ($size === 'small' ? '23.93' : '42')}px;
  height: ${({ $size }) => ($size === 'small' ? '14' : '30')}px;
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
