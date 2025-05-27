import { css } from "@emotion/css";
import StepperButton from "../@common/Button/StepperButton/StepperButton";
import Text from "../@common/Text/Text";

interface QuantityStepperProps {
  quantity: number;
}

const QuantityStepper = ({ quantity }: QuantityStepperProps) => {
  return (
    <div className={QuantityStepperStyle}>
      <StepperButton type="decrease" onClick={() => {}} />
      <Text text={quantity.toString()} />
      <StepperButton type="increase" onClick={() => {}} />
    </div>
  );
};

export default QuantityStepper;

const QuantityStepperStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
