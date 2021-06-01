import React from 'react';
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
import { useSelector } from 'react-redux';

const NavBar = () => {
  const cartLength = useSelector(state => state.product.product.cartItems)
    .length;
  return (
    <Nav>
      <InnerNav>
        <LogoWrapper>
          <span>
            <Cart width="30" height="30" color="white" />
          </span>
          <Link to={ROUTE.HOME}>WOOWA SHOP</Link>
        </LogoWrapper>
        <Menu>
          <AlertNavItem>
            <Link to={ROUTE.CART}>
              장바구니
              {cartLength ? <Alert>{cartLength}</Alert> : ''}
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
