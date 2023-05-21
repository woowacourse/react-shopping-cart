import { DOMAttributes } from 'react';
import styled from 'styled-components';

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
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ dir = 'row' }) => dir};

  justify-content: ${({ justify = 'start' }) => justify};
  align-items: ${({ align = 'stretch' }) => align};

  width: ${({ width = 'auto' }) => width};
  height: ${({ height = 'auto' }) => height};
`;

export default Flex;
