import styled from 'styled-components';

const StyledButton = styled.button`
  width: fit-content;
  text-align: center;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
`;

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
