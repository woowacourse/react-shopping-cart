import { Sign } from '@appTypes/shoppingCart';
import { Minus, Plus } from '@assets/index';
import React from 'react';

import * as Styled from './Count.styled';

const SIGN = {
  minus: <Minus />,
  plus: <Plus />,
};

const ARIA_LABEL = {
  minus: '수량 감소',
  plus: '수량 증가',
};

const CountButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { sign: Sign }> = ({ sign, ...rest }) => {
  return (
    <Styled.CounterButton {...rest} aria-label={ARIA_LABEL[sign]}>
      {SIGN[sign]}
    </Styled.CounterButton>
  );
};

export default CountButton;
