import styled from 'styled-components';

export const Button = styled.button<{
  width?: string;
  height?: string;
  backgroundcolor?: string;
  bordercolor?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border: 1px solid ${({ bordercolor }) => bordercolor};
`;
