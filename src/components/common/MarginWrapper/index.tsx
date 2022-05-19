import React from 'react';
import styled, { css } from 'styled-components';

interface MarginWrapperProp {
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
}

const MarginWrapper = styled.div`
  ${({ mt, mr, mb, ml }: MarginWrapperProp) => css`
    margin-top: ${mt}px;
    margin-right: ${mr}px;
    margin-bottom: ${mb}px;
    margin-left: ${ml}px;
  `}
`;

export default MarginWrapper;
