import { ComponentProps, PropsWithChildren } from "react";
import * as S from "./Button.styled";

export type ButtonVariants = "primary" | "secondary";

type ButtonProps = {
  variant: ButtonVariants;
} & ComponentProps<"button">;

export default function Button({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return <S.Button {...props}>{children}</S.Button>;
}
