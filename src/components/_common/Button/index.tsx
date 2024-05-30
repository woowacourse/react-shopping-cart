import React from "react";
import styled from "styled-components";

type ButtonThemeType = "black" | "white" | "disabled";

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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  $theme?: ButtonThemeType;
  $width?: string;
  $height?: string;
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
  width: ${({ $width }) => ($width ? $width : "fit-content")};
  height: ${({ $height }) => ($height ? $height : "fit-content")};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "4px"};
`;
