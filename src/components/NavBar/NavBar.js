import PropTypes from 'prop-types';
import { Container, LinkContainer } from './NavBar.styles';

const NavBar = ({ Logo, Links }) => (
  <Container>
    {Logo}
    <LinkContainer>{Links}</LinkContainer>
  </Container>
);

NavBar.propTypes = {
  Logo: PropTypes.node.isRequired,
  Links: PropTypes.node.isRequired,
};

export default NavBar;
