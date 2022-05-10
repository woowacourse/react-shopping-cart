import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as HeaderLogo } from 'assets/HeaderLogo.svg';

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

  LogoBox: styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
  `,
  Title: styled.h1`
    font-weight: 900;
    font-size: 40px;
    padding-top: 14px;
  `,
  MenuBox: styled.nav`
    display: flex;
    gap: 45px;
  `,
  Menu: styled.a`
    font-weight: 500;
  `,
};

const Header = () => {
  return (
    <Styled.Wrapper>
      <Styled.LogoBox>
        <HeaderLogo />
        <Styled.Title>WOOWA SHOP</Styled.Title>
      </Styled.LogoBox>
      <Styled.MenuBox>
        <Styled.Menu href="/">장바구니</Styled.Menu>
        <Styled.Menu href="/">주문목록</Styled.Menu>
      </Styled.MenuBox>
    </Styled.Wrapper>
  );
};

export default Header;
