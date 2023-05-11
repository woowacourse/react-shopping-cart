import React, { forwardRef, useState } from 'react';
import Button from '../Button/Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

interface QuantityStepperProps {
  label: string;
}
const QuantityStepper = forwardRef<HTMLInputElement, QuantityStepperProps>(
  ({ label }, ref) => {
    const [quantity, setQuantity] = useState(1);

    const increase = () => {
      setQuantity((prev) => prev + 1);
    };

    const decrease = () => {
      setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };

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

export default QuantityStepper;
