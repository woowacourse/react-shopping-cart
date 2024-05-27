import React, { ReactNode } from "react";
import { css } from "@emotion/css";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  children?: ReactNode;
  variant?: ButtonVariant;
}

const Button = ({ children, variant = "text", ...rest }: ButtonProps) => {
  return (
    <button className={getButtonCSS(variant)} {...rest}>
      {children}
    </button>
  );
};

export default Button;

const getButtonCSS = (variant: ButtonVariant) => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    border: 1px solid #0000001a;
    outline: none;
    cursor: pointer;
    width: ${variant === "text" ? "fit-content" : "24px"};
    border-radius: ${variant === "text" ? "4px" : "8px"};
    padding: ${variant === "text" ? "0 8px" : "0"};
    background-color: ${variant === "primary" ? "#000000" : "#ffffff"};
    color: ${variant === "primary" ? "#ffffff" : "#212529"};
  `;
};
