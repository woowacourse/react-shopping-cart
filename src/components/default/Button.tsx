import React, { ReactNode } from "react";
import { css } from "@emotion/css";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  children?: ReactNode;
  variant?: ButtonVariant;
}

const Button = ({ children, variant = "text", ...rest }: ButtonProps) => {
  return (
    <button
      className={getButtonClassName(variant)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

const getButtonClassName = (variant: ButtonVariant) => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${variant === "text" ? "fit-content" : "24px"};
    height: 24px;
    padding: ${variant === "text" ? "0 8px" : "0"};
    border-radius: ${variant === "text" ? "4px" : "8px"};
    border: 1px solid var(--grey-200);
    outline: none;
    background-color: ${variant === "primary" ? "var(--grey-500)" : "var(--grey-100)"};
    font: var(--cart-label);
    color: ${variant === "primary" ? "var(--grey-100)" : "#212529"};
    cursor: pointer;
  `;
};
