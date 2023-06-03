import React, { forwardRef } from 'react';
import Button from '../Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

interface QuantityStepperProps {
  label: string;
  value: number;
  increase: () => void;
  decrease: () => void;
}
const QuantityStepper = ({
  label,
  value,
  increase,
  decrease,
}: QuantityStepperProps) => {
  return (
    <Flex>
      <Button
        aria-label="장바구니에 1개 추가"
        size="S"
        view="light"
        type="button"
        onClick={decrease}
      >
        ▼
      </Button>
      <S.Quantity value={value} disabled name={label} />
      <Button
        aria-label="장바구니에서 1개 빼기"
        size="S"
        view="light"
        type="button"
        onClick={increase}
      >
        ▲
      </Button>
    </Flex>
  );
};

QuantityStepper.displayName = 'QuantityStepper';

export default QuantityStepper;
