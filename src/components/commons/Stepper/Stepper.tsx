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
        role="textbox"
        inputMode="numeric"
        value={productCount}
        onChange={handleNumberInput}
        aria-label="상품 개수 입력"
      />
      <Styled.UpButton
        type="button"
        onClick={() => setProductCount(productCount + 1)}
        aria-label="상품 1개 추가"
      >
        ▲
      </Styled.UpButton>
      <Styled.DownButton
        type="button"
        onClick={() => setProductCount(productCount - 1)}
        aria-label="상품 1개 삭제"
      >
        ▼
      </Styled.DownButton>
    </Styled.StepperDiv>
  );
};

export default Stepper;
