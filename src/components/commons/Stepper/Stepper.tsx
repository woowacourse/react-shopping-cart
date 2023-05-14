import { ChangeEvent } from 'react';

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
  stepUnit: number;
  minStep: number;
  maxStep: number;
  children: (props: {
    step: number;
    handleNumberInput: ({
      target: { valueAsNumber },
    }: ChangeEvent<HTMLInputElement>) => void;
    handleIncrement: () => void;
    handleDecrement: () => void;
  }) => React.ReactNode;
}

const Stepper = (props: StepperProps) => {
  const { step, setStep, stepUnit, minStep, maxStep, children } = props;

  const handleNumberInput = ({
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

  const handleIncrement = () => setStep(step + stepUnit);
  const handleDecrement = () => setStep(step - stepUnit);

  return (
    <>
      {children({ step, handleNumberInput, handleIncrement, handleDecrement })}
    </>
  );
};

export default Stepper;
