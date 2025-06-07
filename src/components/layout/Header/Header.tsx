import * as S from "./Header.styles";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <S.Header>
      <S.Span>{children}</S.Span>
    </S.Header>
  );
}
