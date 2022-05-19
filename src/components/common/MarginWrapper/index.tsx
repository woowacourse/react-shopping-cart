import React from 'react';
import styled, { css } from 'styled-components';

interface MarginWrapperProp {
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}

const MarginWrapper = styled.div`
  ${({ mt, mr, mb, ml }: MarginWrapperProp) => css`
    margin-top: ${mt};
    margin-right: ${mr};
    margin-bottom: ${mb};
    margin-left: ${ml};
  `}
`;

export default MarginWrapper;
