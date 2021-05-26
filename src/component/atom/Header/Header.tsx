import { Container } from './Header.styles';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => <Container>{children}</Container>;

export default Header;
export type { HeaderProps };
