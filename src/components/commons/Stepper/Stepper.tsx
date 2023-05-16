import { ChangeEvent, ReactElement } from 'react';

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
  stepUnit?: number;
  minStep?: number;
  maxStep?: number;
  children: (props: {
    step: number;
    handleNumberInputChange: ({
      target: { valueAsNumber },
    }: ChangeEvent<HTMLInputElement>) => void;
    handleIncrementButtonClick: () => void;
    handleDecrementButtonClick: () => void;
  }) => ReactElement;
}

export const Stepper = (props: StepperProps) => {
  const {
    step,
    setStep,
    stepUnit = 1,
    minStep = 0,
    maxStep = 99,
    children,
  } = props;

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

  const handleIncrementButtonClick = () => setStep(step + stepUnit);
  const handleDecrementButtonClick = () => setStep(step - stepUnit);

  return children({
    step,
    handleNumberInputChange,
    handleIncrementButtonClick,
    handleDecrementButtonClick,
  });
};
