import styled from "styled-components";

const Button = styled.button`
  width: 425px;
  height: 65px;
  background-color: ${({ theme }) => theme.colors["brown_09"]};
  color: white;
  font-size: 21px;
  border: none;
`;

export default Button;
