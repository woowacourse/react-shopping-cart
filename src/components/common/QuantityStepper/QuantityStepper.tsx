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
      <S.Quantity value={quantity} onChange={() => {}} name={label} />
      <Flex dir="column" height="100%">
        <Button size="SS" view="white" onClick={increase}>
          ▲
        </Button>
        <Button size="SS" view="white" onClick={decrease}>
          ▼
        </Button>
      </Flex>
    </Flex>
  );
};

export default QuantityStepper;
