import styled from 'styled-components';

export const Button = styled.button<{
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderColor?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ borderColor }) => borderColor};
`;
