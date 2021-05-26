import { Container, LinkContainer } from './NavBar.styles';

interface NavBarProps {
  Logo: React.ReactNode;
  Links: React.ReactNode;
}
const NavBar = ({ Logo, Links }: NavBarProps) => (
  <Container>
    {Logo}
    <LinkContainer>{Links}</LinkContainer>
  </Container>
);

export default NavBar;
export type { NavBarProps };
