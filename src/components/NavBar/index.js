import React from 'react';
import { InnerNav, LogoWrapper, Menu, Nav } from './index.styles';
import { Router } from '../../constants';
import { Cart } from '../../assets/svg';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <Nav>
    <InnerNav>
      <LogoWrapper>
        <span>
          <Cart width="30" height="30" color="white" />
        </span>
        <Link to="/">WOOWA SHOP</Link>
      </LogoWrapper>
      <Menu>
        <li>
          <Link to="/carts">{Router.SHOPPING_CART}</Link>
        </li>
        <li>
          <Link to="/completed-orders">{Router.COMPLETED_ORDER_LIST}</Link>
        </li>
      </Menu>
    </InnerNav>
  </Nav>
);

export default NavBar;
