import * as Styled from './Stepper.styled';

interface StepperProps {
  count: number;
  setCount: (count: number) => void;
}

const Stepper = (props: StepperProps) => {
  const { count, setCount } = props;

  return (
    <Styled.Input
      type="number"
      inputMode="numeric"
      min="0"
      value={count}
      onChange={e => setCount(Number(e.target.value))}
    />
  );
};

export default Stepper;
