import { HTMLAttributes } from "react";
import * as S from "./Button.styles";
import { ButtonVariant } from "./type";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export default function Button({
  children,
  disabled = false,
  variant = "contained",
  isLoading = false,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <S.Button
      disabled={disabled}
      variant={variant}
      isLoading={isLoading}
      onClick={(event) => !isLoading && onClick?.(event)}
      {...props}
    >
      {children}
    </S.Button>
  );
}
