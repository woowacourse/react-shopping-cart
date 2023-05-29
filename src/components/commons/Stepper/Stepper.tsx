import { useStepper } from './useStepper';

import {
  StyledStepperButtonFlexBox,
  StyledStepperFlexBox,
} from './Stepper.styled';
import { Input as StepInput } from '@commons/Input/Input';
import { Button as StepperHandleButton } from '@commons/Button/Button';
import * as Text from '@commons/Text/Text';

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
  stepUnit?: number;
  minStep?: number;
  maxStep?: number;
  handleIncreaseStep?: (newQuantity: number) => Promise<void>;
  handleDecreaseStep?: (newQuantity: number) => Promise<void>;
  inputWidth?: string;
  inputHeight?: string;
  buttonWidth?: string;
  buttonHeight?: string;
}

export const Stepper = (props: StepperProps) => {
  const {
    step,
    setStep,
    stepUnit = 1,
    minStep = 0,
    maxStep = 99,
    handleIncreaseStep,
    handleDecreaseStep,
    inputWidth,
    inputHeight,
    buttonWidth,
    buttonHeight,
  } = props;

  const {
    handleNumberInputChange,
    handleIncrementButtonClick,
    handleDecrementButtonClick,
  } = useStepper({
    step,
    setStep,
    stepUnit,
    minStep,
    maxStep,
    handleIncreaseStep,
    handleDecreaseStep,
  });

  return (
    <StyledStepperFlexBox>
      <StepInput
        width={inputWidth ?? '48px'}
        height={inputHeight ?? '28px'}
        type="number"
        value={step}
        inputMode="numeric"
        role="textbox"
        aria-label="상품 개수 입력"
        onChange={handleNumberInputChange}
      />
      <StyledStepperButtonFlexBox>
        <StepperHandleButton
          width={buttonWidth ?? '28px'}
          height={buttonHeight ?? '14px'}
          aria-label="상품 1개 추가"
          backgroundColor="#white"
          onClick={handleIncrementButtonClick}
          type="button"
          name="상품 추가 버튼"
          border="1px solid #dddddd"
        >
          <Text.Paragraph color="#333333" fontSize="xx-small">
            ▲
          </Text.Paragraph>
        </StepperHandleButton>
        <StepperHandleButton
          width={buttonWidth ?? '28px'}
          height={buttonHeight ?? '14px'}
          aria-label="상품 1개 삭제"
          backgroundColor="#white"
          onClick={handleDecrementButtonClick}
          type="button"
          name="상품 삭제 버튼"
          border="1px solid #dddddd"
        >
          <Text.Paragraph color="#333333" fontSize="xx-small">
            ▼
          </Text.Paragraph>
        </StepperHandleButton>
      </StyledStepperButtonFlexBox>
    </StyledStepperFlexBox>
  );
};
