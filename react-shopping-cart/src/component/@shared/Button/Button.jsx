import styled from "styled-components";

const Button = styled.button`
  width: 425px;
  height: 65px;
  color: white;
  font-size: 21px;
  border: none;
  cursor: pointer;
  :hover {
    filter: brightness(1.15);
  }

  background-color: ${({ $isincart, theme }) =>
    $isincart ? theme.colors["red_03"] : theme.colors["brown_09"]};
`;

export default Button;
