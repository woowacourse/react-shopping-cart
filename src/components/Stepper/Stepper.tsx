import * as S from './Stepper.styles';

interface StepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function Stepper({ quantity, onIncrease, onDecrease }: StepperProps) {
  return (
    <S.stepperLayout>
      <S.stepperButtonContainer>
        <S.stepperButton src="./minus-quantity.svg" alt="minus" onClick={onDecrease} />
      </S.stepperButtonContainer>
      <S.stepperTextBox>
        <p>{quantity}</p>
      </S.stepperTextBox>
      <S.stepperButtonContainer>
        <S.stepperButton src="./add-quantity.svg" alt="plus" onClick={onIncrease} />
      </S.stepperButtonContainer>
    </S.stepperLayout>
  );
}
