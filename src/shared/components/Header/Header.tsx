import { PropsWithChildren } from "react";
import * as S from "./Header.styled";

export default function Header({ children }: PropsWithChildren) {
  return <S.Header>{children}</S.Header>;
}
