import {
  InnerNav,
  LogoWrapper,
  Menu,
  Nav,
  NavItem,
  Alert,
  AlertNavItem,
} from './index.styles';
import { ROUTE } from '../../constants';
import { Cart } from '../../assets/svg';
import { Link } from 'react-router-dom';
import useCarts from '../../hooks/useCarts';

const NavBar = () => {
  const { cartItems, getTotalQuantity } = useCarts();

  const totalCartLength = getTotalQuantity(cartItems);

  return (
    <Nav>
      <InnerNav>
        <LogoWrapper>
          <span>
            <Cart width="25" height="25" color="white" />
          </span>
          <Link to={ROUTE.HOME}>WOOWA SHOP</Link>
        </LogoWrapper>
        <Menu>
          <AlertNavItem>
            <Link to={ROUTE.CART}>
              장바구니
              {totalCartLength ? <Alert>{totalCartLength}</Alert> : ''}
            </Link>
          </AlertNavItem>
          <NavItem>
            <Link to={ROUTE.COMPLETED_ORDER}>주문목록</Link>
          </NavItem>
        </Menu>
      </InnerNav>
    </Nav>
  );
};

export default NavBar;
