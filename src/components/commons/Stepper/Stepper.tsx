import * as Styled from './Stepper.styled';

interface StepperProps {
  productCount: number;
  setProductCount: (count: number) => void;
}

const Stepper = (props: StepperProps) => {
  const { productCount, setProductCount } = props;

  return (
    <Styled.Input
      type="number"
      inputMode="numeric"
      min="0"
      value={productCount}
      onChange={e => setProductCount(Number(e.target.value))}
    />
  );
};

export default Stepper;
