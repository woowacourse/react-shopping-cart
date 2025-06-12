import { HTMLAttributes, PropsWithChildren, ElementType } from "react";
import * as S from "./Text.styles";
import { theme } from "@/styles";

export type TextVariant = "title-1" | "title-2" | "title-3" | "title-4" | "body-0" | "body-1" | "body-2" | "body-3";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
  color?: string;
}

export default function Text({
  as = "span",
  variant = "body-2",
  color = theme.colors.black,
  children,
  ...props
}: PropsWithChildren<TextProps>) {
  return (
    <S.Text as={as} variant={variant} color={color} {...props}>
      {children}
    </S.Text>
  );
}
