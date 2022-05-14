import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as CartIcon } from 'assets/icon/Cart.svg';
import { ROUTE } from 'constants';

const Styled = {
  Wrapper: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #2ac1bc;
    width: 100%;
    height: 80px;
    color: #fff;
  `,
  LogoBox: styled(Link)`
    display: flex;
    align-items: center;
    gap: 20px;

    svg {
      width: 50px;
      height: 40px;
      & path {
        fill: white;
      }
    }
  `,
  Title: styled.h1`
    font-weight: 900;
    font-size: 40px;
    padding-top: 3px;
  `,
  MenuBox: styled.nav`
    display: flex;
    gap: 45px;
  `,
  Menu: styled(Link)`
    font-weight: 500;
  `,
};

const Header = () => {
  return (
    <Styled.Wrapper>
      <Styled.LogoBox to={ROUTE.HOME}>
        <CartIcon />
        <Styled.Title>WOOWA SHOP</Styled.Title>
      </Styled.LogoBox>
      <Styled.MenuBox>
        <Styled.Menu to={ROUTE.CART}>장바구니</Styled.Menu>
        <Styled.Menu to={ROUTE.ORDER_LIST}>주문목록</Styled.Menu>
      </Styled.MenuBox>
    </Styled.Wrapper>
  );
};

export default Header;
