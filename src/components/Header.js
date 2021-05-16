import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../asset/logo.svg';
import Badge from './utils/Badge';
import Flex from './utils/Flex';

import { COLOR } from '../constant';

import styled, { css } from 'styled-components';

const HeaderWrapper = styled.header`
  min-width: 1440px;
  height: 80px;
  background-color: ${COLOR.CYAN[400]};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
`;

const HeaderDivStyle = css`
  max-width: 1440px;
  height: 100%;
  padding: 0 60px;
  margin: 0 auto;
`;

const LogoImage = styled.img`
  width: 360px;
  height: 44px;
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 225px;
`;

const NavItem = styled(NavLink)`
  position: relative;
  text-decoration: none;
  color: ${COLOR.WHITE[400]};
  font-size: 24px;
`;

function Header() {
  const state = useSelector((state) => state.cart);

  return (
    <HeaderWrapper>
      <Flex justifyContent="space-between" alignItems="center" css={HeaderDivStyle}>
        <h1>
          <NavLink to="/">
            <LogoImage src={logo} alt="신세티케의 장바구니 로고" />
          </NavLink>
        </h1>

        <nav>
          <NavUl>
            <li>
              <NavItem to="/cart">장바구니 {state.length ? <Badge children={state.length} /> : ''}</NavItem>
            </li>
            <li>
              <NavItem to="/orders">주문목록</NavItem>
            </li>
          </NavUl>
        </nav>
      </Flex>
    </HeaderWrapper>
  );
}

export default Header;
