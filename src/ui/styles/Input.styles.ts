import styled from 'styled-components';

export const Input = styled.input<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
