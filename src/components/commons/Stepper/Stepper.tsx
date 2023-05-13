import useMyCartUpdater from '../../../hooks/useMyCartUpdater';

import * as Styled from './Stepper.styled';

interface StepperProps {
  productId: number;
}

const Stepper = (props: StepperProps) => {
  const { productId } = props;

  const {
    value,
    increaseValue,
    decreaseValue,
    setValue,
  } = useMyCartUpdater(productId, { min: 0, max: 99, step: 1 });

  return (
    <Styled.StepperDiv>
      <Styled.Input
        type="text"
        role="textbox"
        inputMode="numeric"
        value={value}
        onChange={({ target: { value } }) => setValue(Number(value))}
        aria-label="상품 개수 입력"
      />
      <Styled.UpButton
        type="button"
        onClick={increaseValue}
        aria-label="상품 1개 추가"
      >
        ▲
      </Styled.UpButton>
      <Styled.DownButton
        type="button"
        onClick={decreaseValue}
        aria-label="상품 1개 삭제"
      >
        ▼
      </Styled.DownButton>
    </Styled.StepperDiv>
  );
};

export default Stepper;
