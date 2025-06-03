import { HTMLAttributes } from "react";
import * as S from "./Button.styles";
import { ButtonVariant } from "./type";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant;
}

export default function Button({ children, disabled = false, variant = "contained", ...props }: ButtonProps) {
  return (
    <S.Button disabled={disabled} variant={variant} {...props}>
      {children}
    </S.Button>
  );
}
