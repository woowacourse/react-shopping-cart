import React from 'react';
import styled from 'styled-components';

const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.gridColumnRepeatCount}, ${props.gridColumnWidth})`};
  grid-column-gap: ${(props) => props.gridColumnGap};
  grid-row-gap: ${(props) => props.gridRowGap};
`;

function GridColumnList(props) {
  const { children } = props;

  return <StyledProductList {...props}>{children}</StyledProductList>;
}

export default GridColumnList;
