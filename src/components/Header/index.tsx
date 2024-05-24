import * as S from './style';

interface HeaderProps {
  homeButton: React.ReactNode;
}

export default function Header({ homeButton }: HeaderProps) {
  return <S.HeaderContainer>{homeButton}</S.HeaderContainer>;
}
