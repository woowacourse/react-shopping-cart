import { HeaderStyle } from './Header.styles';

interface HeaderProps {
  children: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return <section css={HeaderStyle}>{children}</section>;
}

export default Header;
