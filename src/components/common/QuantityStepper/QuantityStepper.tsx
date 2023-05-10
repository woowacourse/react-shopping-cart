import React, { useState } from 'react';
import Button from '../Button/Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

const QuantityStepper = ({ label }: { label: string }) => {
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
      <S.Quantity value={quantity} onChange={() => {}} name={label} />
      <Button size="S" view="white" onClick={increase}>
        ▲
      </Button>
    </Flex>
  );
};

export default QuantityStepper;
