import styled from "styled-components";
import { Link } from "react-router-dom";

const NavigateButton = styled(Link)`
  font-weight: 500;
  font-size: 16px;
  line-height: 12px;
  text-decoration: none;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  :hover {
    filter: brightness(90%);
  }
`;

export default NavigateButton;
