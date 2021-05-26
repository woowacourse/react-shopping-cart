import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import shoppingCartImg from 'assets/images/shopping_cart.png';
import orderListImg from 'assets/images/order.png';
import Styled from './Header.styles';

const Header = () => {
  return (
    <Styled.Root>
      <Styled.Container>
        <Link to="/">
          <Styled.Title>
            <Logo />
          </Styled.Title>
        </Link>
        <Styled.Nav>
          <Link to="/cart">
            <Styled.NavItem>장바구니</Styled.NavItem>
            <Styled.NavIcon src={shoppingCartImg} alt="cart" />
          </Link>
          <Link to="/order/list">
            <Styled.NavItem>주문목록</Styled.NavItem>
            <Styled.NavIcon src={orderListImg} alt="order-list" />
          </Link>
        </Styled.Nav>
      </Styled.Container>
    </Styled.Root>
  );
};

export default Header;
