import { ComponentProps, PropsWithChildren } from "react";
import * as S from "./BottomFixedButton.styled";

type BottomFixedButtonProps = ComponentProps<"button">;

export default function BottomFixedButton({
  children,
  ...rest
}: PropsWithChildren<BottomFixedButtonProps>) {
  return <S.Button {...rest}>{children}</S.Button>;
}
