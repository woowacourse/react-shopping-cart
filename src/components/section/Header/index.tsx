import * as S from "./styled";

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <S.Container>{children}</S.Container>;
};

export default Header;
