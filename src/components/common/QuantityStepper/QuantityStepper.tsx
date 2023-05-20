import React, { forwardRef } from 'react';
import useCounter from '../../../hooks/common/useCounter';
import Button from '../Button/Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

const QuantityStepper = forwardRef<HTMLInputElement>((props, ref) => {
  const [quantity, increase, decrease] = useCounter({
    max: 100,
    min: 1,
  });

  return (
    <Flex>
      <Button size="S" view="white" onClick={decrease}>
        ▼
      </Button>
      <S.Quantity ref={ref} value={quantity} disabled />
      <Button size="S" view="white" onClick={increase}>
        ▲
      </Button>
    </Flex>
  );
});

QuantityStepper.displayName = 'QuantityStepper';

export default QuantityStepper;
