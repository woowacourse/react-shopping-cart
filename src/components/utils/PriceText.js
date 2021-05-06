import React from 'react';
import styled from 'styled-components';

const StyledProductPrice = styled.span`
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || '#333333'};
`;

function PriceText(props) {
  const { children } = props;

  return <StyledProductPrice {...props}>{children} 원</StyledProductPrice>;
}

export default PriceText;
