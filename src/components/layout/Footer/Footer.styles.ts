import styled from "@emotion/styled";
import { FooterProps } from "./Footer.types";

export const Footer = styled.footer<FooterProps>`
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* active 값이 true면 검정, false면 회색 */
  background-color: ${({ active }) => (active ? "#000000" : "#BEBEBE")};

  height: 64px;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
`;

export const Span = styled.span`
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
`;
