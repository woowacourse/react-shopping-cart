import React from 'react';
import styled from 'styled-components';

function PriceBox({ price, fontSize }) {
  return <StyledPriceBox fontSize={fontSize}>{Number(price).toLocaleString()}원</StyledPriceBox>;
}

const StyledPriceBox = styled.span`
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize || 16}px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 0.5px;
`;

export default PriceBox;
