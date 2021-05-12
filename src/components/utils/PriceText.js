import React from 'react';

import { printCommasToPrice } from '../../utils';

import styled from 'styled-components';

const ProductPrice = styled.span`
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || '#333333'};
`;

const PriceText = ({ children, ...props }) => {
  return <ProductPrice {...props}>{printCommasToPrice(children)}원</ProductPrice>;
};

export default PriceText;
