import { Sign } from '@appTypes/shoppingCart';
import { Minus, Plus } from '@assets/index';
import React from 'react';

import * as Styled from './Count.styled';

const SIGN = {
  minus: <Minus />,
  plus: <Plus />,
};

const CountButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { sign: Sign }> = ({ sign, ...rest }) => {
  return <Styled.CounterButton {...rest}>{SIGN[sign]}</Styled.CounterButton>;
};

export default CountButton;
