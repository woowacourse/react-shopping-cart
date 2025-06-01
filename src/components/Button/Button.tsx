import { HTMLAttributes } from "react";
import * as S from "./Button.styles";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ children, disabled = false, ...props }: ButtonProps) {
  return (
    <S.Button disabled={disabled} {...props}>
      {children}
    </S.Button>
  );
}
