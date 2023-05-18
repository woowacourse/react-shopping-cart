import type { ChangeEvent } from 'react';
import styled from '@emotion/styled';

interface InputStepperProps {
  size: 'small' | 'big';
  quantity: number;
  setQuantity: (value: number) => void;
}

interface InputStepperStyleProps {
  $size: InputStepperProps['size'];
}

const InputStepper = ({ size, quantity, setQuantity }: InputStepperProps) => {
  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    const checkNumberRegExp = /^\d{1,2}$/;
    if (!checkNumberRegExp.test(e.target.value)) return;

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

const InputStyle = styled.input<InputStepperStyleProps>`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  ${({ $size }) =>
    $size === 'small'
      ? 'width: 41.6px; height: 28px; font-size: 12px;'
      : 'width: 73px; height: 60px; font-size: 24px; '}

  border: 1px solid #dddddd;
  outline: none;

  text-align: center;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const StepperButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StepperDownButton = styled.button<InputStepperStyleProps>`
  ${({ $size }) =>
    $size === 'small'
      ? 'width: 23.93px; height: 14px; font-size: 12px;'
      : 'width: 42px; height: 30px; font-size: 24px; '}

  border: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
`;

const StepperUpButton = styled(StepperDownButton)`
  transform: scaleY(-1);
`;
