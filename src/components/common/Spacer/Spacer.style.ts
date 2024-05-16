import styled from 'styled-components';

export const Spacer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px;`};
  width: 100%;
`;
