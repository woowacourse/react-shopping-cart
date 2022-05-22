import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { ReactComponent as CartIcon } from 'assets/icon/Cart.svg';
import Flex from 'components/@common/Flex';

const Header = () => {
  return (
    <Styled.Container>
      <Flex h="100%" justify="space-between" align="center">
        <Styled.LogoBox to="/">
          <Flex align="center" gap="20px">
            <CartIcon />
            <Styled.Title>WOOWA SHOP</Styled.Title>
          </Flex>
        </Styled.LogoBox>
        <Flex gap="45px">
          <Styled.Menu to="/cart">장바구니</Styled.Menu>
          <Styled.Menu to="/orderList">주문목록</Styled.Menu>
        </Flex>
      </Flex>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.header`
    width: 100%;
    height: 80px;
    padding: 0 100px;

    ${({ theme }) => css`
      background: ${theme.colors.mint};
      color: ${theme.colors.white};
    `}
  `,
  LogoBox: styled(Link)`
    svg {
      width: 50px;
      height: 40px;
      & path {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `,
  Title: styled.h1`
    font-weight: 900;
    font-size: 40px;
  `,
  Menu: styled(Link)`
    font-weight: 500;
  `,
};

export default Header;
