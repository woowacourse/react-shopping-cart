import styled from 'styled-components';

const Button = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;
  cursor: pointer;
`;

export default Button;
