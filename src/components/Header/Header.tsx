import * as S from "./Header.styles";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Header({ children, ...props }: HeaderProps) {
  return <S.headerLayout {...props}>{children}</S.headerLayout>;
}
