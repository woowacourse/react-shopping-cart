import { ChangeEvent } from 'react';

import * as Styled from './Stepper.styled';

interface StepperProps {
  productCount: number;
  setProductCount: (count: number) => void;
}

const Stepper = (props: StepperProps) => {
  const { productCount, setProductCount } = props;

  const handleNumberInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value);

    if (Number.isNaN(value) || value < 0 || value > 99) {
      return;
    }

    setProductCount(value);
  };

  return (
    <Styled.StepperDiv>
      <Styled.Input
        type="text"
        inputMode="numeric"
        value={productCount}
        onChange={handleNumberInput}
      />
      <Styled.UpButton
        type="button"
        onClick={() => setProductCount(productCount + 1)}
      >
        ▲
      </Styled.UpButton>
      <Styled.DownButton
        type="button"
        onClick={() => setProductCount(productCount - 1)}
      >
        ▼
      </Styled.DownButton>
    </Styled.StepperDiv>
  );
};

export default Stepper;
