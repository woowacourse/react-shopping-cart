import React, { ReactNode } from "react";
import { css } from "@emotion/css";

type ButtonVariant = "primary" | "secondary";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({ children, variant = "primary", size = "large", ...rest }: ButtonProps) => {
  return (
    <button
      className={getButtonClassName(variant, size)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

const getButtonClassName = (variant: ButtonVariant, size: ButtonSize) => {
  return `${baseStyle} ${styles[variant]} ${styles[size]}`;
};

const baseStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--grey-200);
  outline: none;
  cursor: pointer;
`;

const styles = {
  primary: css`
    background-color: var(--grey-500);
    color: var(--grey-100);
  `,
  secondary: css`
    background-color: var(--grey-100);
    color: #212529;
  `,
  small: css`
    width: 24px;
    height: 24px;
    padding: 0;
    border-radius: 8px;
    font: var(--cart-label);
  `,
  medium: css`
    width: fit-content;
    height: 24px;
    padding: 0 8px;
    border-radius: 4px;
    font: var(--cart-label);
  `,
  large: css`
    width: 100%;
    padding: 16px 0;
    border-radius: 5px;
    font: var(--cart-subtitle);
  `,
};
