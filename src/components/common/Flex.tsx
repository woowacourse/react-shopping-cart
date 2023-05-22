import { DOMAttributes } from 'react';
import styled, { css } from 'styled-components';

interface FlexProps extends DOMAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  dir?: 'row' | 'column';
  justify?:
    | 'start'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

  align?: 'stretch' | 'center' | 'start' | 'end';
  scroll?: boolean;
  wrap?: boolean;
  grow?: boolean;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ dir = 'row' }) => dir};
  ${({ wrap }) =>
    wrap &&
    css`
      flex-wrap: wrap;
    `}

  ${({ grow }) =>
    grow &&
    css`
      flex-grow: 1;
    `}

  justify-content: ${({ justify = 'start' }) => justify};
  align-items: ${({ align = 'stretch' }) => align};

  width: ${({ width = 'auto' }) => width};
  height: ${({ height = 'auto' }) => height};
`;

export default Flex;
