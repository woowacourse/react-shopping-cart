import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../constants';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';
import { Container, LogoContainer, ButtonContainer } from './NavBar.styles';

const NavBar = ({ Logo, Buttons }) => (
  <Container>
    <LogoContainer to={ROUTE.HOME}>{Logo}</LogoContainer>
    <ButtonContainer>{Buttons}</ButtonContainer>
  </Container>
);

NavBar.propTypes = {
  Logo: PropTypes.node,
  Buttons: PropTypes.node,
};

NavBar.defaultProps = {
  Logo: (
    <>
      <ShoppingCartIcon scale="0.8" color="white" />
      <span>WOOWA SHOP</span>
    </>
  ),
  Buttons: (
    <>
      <Link to={ROUTE.SHOPPING_CART}>장바구니</Link>
      <Link to={ROUTE.ORDER_LIST}>주문목록</Link>
    </>
  ),
};

export default NavBar;
