import { css } from "@emotion/css";
import StepperButton from "../@common/Button/StepperButton/StepperButton";
import Text from "../@common/Text/Text";

interface QuantityStepperProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const QuantityStepper = ({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityStepperProps) => {
  return (
    <div className={QuantityStepperStyle}>
      <StepperButton
        testId="decrease-button"
        type="decrease"
        onClick={onDecrease}
      />
      <Text text={quantity.toString()} />
      <StepperButton
        testId="increase-button"
        type="increase"
        onClick={onIncrease}
      />
    </div>
  );
};

export default QuantityStepper;

const QuantityStepperStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;
