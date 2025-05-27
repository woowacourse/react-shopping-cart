import { ComponentProps } from "react";
import * as S from "./FooterButton.styles";

interface Props extends ComponentProps<"button"> {}

const FooterButton = ({ children, ...props }: Props) => {
  return <S.FooterButton {...props}>{children}</S.FooterButton>;
};

export default FooterButton;
