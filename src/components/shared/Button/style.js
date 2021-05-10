import styled from 'styled-components';

export const Container = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  outline: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  cursor: pointer;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};

  &:hover {
    filter: brightness(0.8);
  }

  &:disabled {
    background-color: blue;
  }
`;
