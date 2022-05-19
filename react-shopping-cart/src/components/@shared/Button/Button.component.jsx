import styled from 'styled-components';

const Button = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin || '0'};
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;
  cursor: pointer;
`;

export default Button;
