import React from 'react';
import Button from '../Button/Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

const QuantityStepper = () => {
  return (
    <Flex>
      <S.QuantityInput defaultValue={1} />
      <Flex dir="column" height="100%">
        <Button size="SS" view="white">
          ▲
        </Button>
        <Button size="SS" view="white">
          ▼
        </Button>
      </Flex>
    </Flex>
  );
};

export default QuantityStepper;
