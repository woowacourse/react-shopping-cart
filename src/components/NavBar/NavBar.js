import PropTypes from 'prop-types';
import { Container, ButtonContainer } from './NavBar.styles';

const NavBar = ({ Logo, Buttons }) => (
  <Container>
    {Logo}
    <ButtonContainer>{Buttons}</ButtonContainer>
  </Container>
);

NavBar.propTypes = {
  Logo: PropTypes.node.isRequired,
  Buttons: PropTypes.node.isRequired,
};

export default NavBar;
