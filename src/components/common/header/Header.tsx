import * as S from './Header.styles';

interface HeaderProps {
  title?: string;
  leftArea?: React.ReactNode;
}

function Header({ title = '', leftArea }: HeaderProps) {
  return (
    <S.HeaderContainer>
      {leftArea}
      <S.HeaderTitle>{title}</S.HeaderTitle>
    </S.HeaderContainer>
  );
}

export default Header;
