import { ChangeEvent } from 'react';

import {
  StyledDownButton,
  StyledInput,
  StyledStepperDiv,
  StyledUpButton,
} from '@components/commons/Stepper/Stepper.styled';

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
    <StyledStepperDiv>
      <StyledInput
        type="text"
        role="textbox"
        inputMode="numeric"
        value={productCount}
        onChange={handleNumberInput}
        aria-label="상품 개수 입력"
      />
      <StyledUpButton
        type="button"
        onClick={() => setProductCount(productCount + 1)}
        aria-label="상품 1개 추가"
      >
        ▲
      </StyledUpButton>
      <StyledDownButton
        type="button"
        onClick={() => setProductCount(productCount - 1)}
        aria-label="상품 1개 삭제"
      >
        ▼
      </StyledDownButton>
    </StyledStepperDiv>
  );
};

export default Stepper;
