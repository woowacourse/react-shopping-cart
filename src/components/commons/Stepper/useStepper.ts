import { ChangeEvent } from 'react';

import { STEP_UNIT } from '@constants/product';

export const useStepper = ({
  step,
  setStep,
  stepUnit = 1,
  minStep = 0,
  maxStep = 99,
  handleIncreaseStep,
  handleDecreaseStep,
}: {
  step: number;
  setStep: (step: number) => void;
  stepUnit?: number;
  minStep?: number;
  maxStep?: number;
  handleIncreaseStep?: (newQuantity: number) => Promise<void>;
  handleDecreaseStep?: (newQuantity: number) => Promise<void>;
}) => {
  const handleNumberInputChange = ({
    target: { valueAsNumber },
  }: ChangeEvent<HTMLInputElement>) => {
    if (
      Number.isNaN(valueAsNumber) ||
      valueAsNumber < minStep ||
      valueAsNumber > maxStep
    ) {
      return;
    }

    setStep(valueAsNumber);
  };

  const handleIncrementButtonClick = () => {
    if (handleIncreaseStep) handleIncreaseStep(step + STEP_UNIT);

    setStep(step + stepUnit);
  };
  const handleDecrementButtonClick = () => {
    if (handleDecreaseStep) handleDecreaseStep(step - STEP_UNIT);

    setStep(step - stepUnit);
  };

  return {
    handleNumberInputChange,
    handleIncrementButtonClick,
    handleDecrementButtonClick,
  };
};
