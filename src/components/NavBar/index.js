import React from 'react';
import { InnerNav, LogoWrapper, Menu, Nav } from './index.styles';
import { ROUTE } from '../../constants';
import { Cart } from '../../assets/svg';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <Nav>
    <InnerNav>
      <LogoWrapper>
        <span>
          <Cart width="30" height="30" color="white" />
        </span>
        <Link to={ROUTE.HOME}>WOOWA SHOP</Link>
      </LogoWrapper>
      <Menu>
        <li>
          <Link to={ROUTE.CART}>장바구니</Link>
        </li>
        <li>
          <Link to={ROUTE.COMPLETED_ORDER}>주문목록</Link>
        </li>
      </Menu>
    </InnerNav>
  </Nav>
);

export default NavBar;
