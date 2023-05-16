import React, { forwardRef } from 'react';
import useCounter from '../../../hooks/common/useCounter';
import Button from '../Button/Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

interface QuantityStepperProps {
  label: string;
}
const QuantityStepper = forwardRef<HTMLInputElement, QuantityStepperProps>(
  ({ label }, ref) => {
    const [quantity, increase, decrease] = useCounter({
      max: 100,
      min: 1,
    });

    return (
      <Flex>
        <Button size="S" view="white" onClick={decrease}>
          ▼
        </Button>
        <S.Quantity ref={ref} value={quantity} disabled name={label} />
        <Button size="S" view="white" onClick={increase}>
          ▲
        </Button>
      </Flex>
    );
  }
);

QuantityStepper.displayName = 'QuantityStepper';

export default QuantityStepper;
