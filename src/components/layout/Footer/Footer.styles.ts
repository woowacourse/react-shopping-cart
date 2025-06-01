import styled from "@emotion/styled";
import { FooterProps } from "./Footer.types";

export const StyledFooter = styled.footer<FooterProps>`
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* active 값이 true면 검정, false면 회색 */
  background-color: ${({ active }) => (active ? "#000000" : "#BEBEBE")};

  height: 64px;
  cursor: pointer;
  position: fixed;
`;

export const StyledButton = styled.button`
  width: 100%;
  height: 100%;
`;

export const StyledSpan = styled.span`
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
`;
