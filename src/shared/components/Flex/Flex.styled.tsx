import styled from '@emotion/styled';

import { Props } from '.';

export const StyledFlexBox = styled.div<Props>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap = 0 }) => (typeof gap === 'number' ? `${gap}px` : gap)};
  margin: ${({ margin = 0 }) => (typeof margin === 'number' ? `${margin}px` : margin)};
  padding: ${({ padding = 0 }) => (typeof padding === 'number' ? `${padding}px` : padding)};
  width: ${({ width = 'auto' }) => width};
  height: ${({ height = 'auto' }) => height};
`;
