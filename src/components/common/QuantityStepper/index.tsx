import React, { forwardRef } from 'react';
import useCounter from '../../../hooks/common/useCounter';
import Button from '../Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

interface QuantityStepperProps {
  label: string;
  initialValue?: number;
}
const QuantityStepper = forwardRef<HTMLInputElement, QuantityStepperProps>(
  ({ label, initialValue = 1 }, ref) => {
    const [quantity, increase, decrease] = useCounter({
      max: 100,
      min: 1,
      initialValue,
    });

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
        <S.Quantity ref={ref} value={quantity} disabled name={label} />
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
  }
);

QuantityStepper.displayName = 'QuantityStepper';

export default QuantityStepper;
