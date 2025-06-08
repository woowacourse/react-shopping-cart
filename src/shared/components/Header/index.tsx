import * as S from "./Header.styled";

const Header = ({ children }: { children: React.ReactNode }) => {
  return <S.Header>{children}</S.Header>;
};

export default Header;
