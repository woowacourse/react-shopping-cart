import React from 'react';
import { InnerNav, LogoWrapper, Menu, Nav } from './index.styles';
import { Router } from '../../constants';

const NavBar = () => (
  <Nav>
    <InnerNav>
      <LogoWrapper>
        <span>
          <i className="fas fa-shopping-cart" />
        </span>
        <span>WOOWA SHOP</span>
      </LogoWrapper>
      <Menu>
        <li>{Router.SHOPPING_CART}</li>
        <li>{Router.COMPLETED_ORDER_LIST}</li>
      </Menu>
    </InnerNav>
  </Nav>
);

export default NavBar;
