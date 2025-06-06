import * as S from "./Header.styled";

function Header({ children }: { children: React.ReactNode }) {
  return <S.HeaderContainer>{children}</S.HeaderContainer>;
}

export default Header;
