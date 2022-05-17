import styled from 'styled-components';

const Button = styled.button`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;
`;

export default Button;
