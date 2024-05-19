import React from "react";
import styled from "styled-components";

type ButtonThemeType = "black" | "white" | "disabled";
type ButtonSizeType = "xs" | "s" | "m" | "full";

const BUTTON_THEME = {
  black: {
    backgroundColor: "#000000",
    color: "#ffffff",
  },
  white: {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  disabled: {
    backgroundColor: "#d0d0d0",
    color: "#ffffff",
  },
};

const BUTTON_SIZE = {
  xs: {
    width: "24px",
    height: "24px",
  },
  s: {
    width: "40px",
    height: "24px",
  },
  m: {
    width: "56px",
    height: "32px",
  },
  full: {
    width: "100%",
    height: "100%",
  },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  $theme?: ButtonThemeType;
  $size?: ButtonSizeType;
  $borderRadius?: string;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $theme }) =>
    $theme ? BUTTON_THEME[$theme].backgroundColor : "transparent"};
  color: ${({ $theme }) => ($theme ? BUTTON_THEME[$theme].color : "inherit")};
  border: ${({ $theme }) => ($theme ? "1px solid rgba(0, 0, 0, 0.1)" : "none")};
  padding: 0;
  cursor: pointer;
  width: ${({ $size }) => ($size ? BUTTON_SIZE[$size].width : "fit-content")};
  height: ${({ $size }) => ($size ? BUTTON_SIZE[$size].height : "fit-content")};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "4px"};
`;
