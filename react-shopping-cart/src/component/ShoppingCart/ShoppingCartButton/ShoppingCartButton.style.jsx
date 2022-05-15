import styled from "styled-components";
import Button from "component/@shared/Button/Button";

export const ShoppingCartButtonBox = styled(Button)`
  width: 425px;
  height: 65px;
  font-size: 21px;
  background-color: ${({ isincart, theme }) =>
    isincart ? theme.colors["red_03"] : theme.colors["brown_09"]};
`;
