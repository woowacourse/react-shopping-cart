import React, { ReactNode } from "react";
import { css } from "@emotion/css";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  children?: ReactNode;
  variant?: ButtonVariant;
}

export const Button = ({ children, variant = "text", ...rest }: ButtonProps) => {
  return (
    <button className={getButtonClassName(variant)} {...rest}>
      {children}
    </button>
  );
};

const getButtonClassName = (variant: ButtonVariant) => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${variant === "text" ? "fit-content" : "24px"};
    height: 24px;
    border-radius: ${variant === "text" ? "4px" : "8px"};
    border: 1px solid #0000001a;
    outline: none;
    background-color: ${variant === "primary" ? "#000000" : "#ffffff"};
    color: ${variant === "primary" ? "#ffffff" : "#212529"};
    cursor: pointer;
    padding: ${variant === "text" ? "0 8px" : "0"};
  `;
};
