import styled from "@emotion/styled";
import { FooterProps } from "./Footer.types";

const ButtonVariants = {
  true: {
    backgroundColor: "#000000",
  },
  false: {
    backgroundColor: "#BEBEBE",
  },
};

export const Footer = styled.footer<FooterProps>`
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ active }) => ButtonVariants[active]};
  height: 64px;
  cursor: pointer;
  position: fixed;

  span {
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
`;
