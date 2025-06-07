import { PropsWithChildren } from "react";
import * as S from "./Header.styles";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ children, ...props }: PropsWithChildren<HeaderProps>) {
  return <S.headerLayout {...props}>{children}</S.headerLayout>;
}
