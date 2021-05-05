import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';
import { Container, LogoContainer, ButtonContainer } from './NavBar.styles';

const NavBar = ({ Logo, Buttons }) => (
  <Container>
    <LogoContainer>{Logo}</LogoContainer>
    <ButtonContainer>{Buttons}</ButtonContainer>
  </Container>
);

NavBar.propTypes = {
  Logo: PropTypes.node,
  Buttons: PropTypes.node,
};

NavBar.defaultProps = {
  Logo: (
    <Link to="/">
      <ShoppingCartIcon scale="0.8" color="white" />
      <span>WOOWA SHOP</span>
    </Link>
  ),
  Buttons: (
    <>
      <Link to="/cart">장바구니</Link>
      <Link to="/orders">주문목록</Link>
    </>
  ),
};

export default NavBar;
