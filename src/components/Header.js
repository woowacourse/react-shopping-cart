import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../asset/logo.svg';

import styled from 'styled-components';
import Badge from './utils/Badge';

const HeaderWrapper = styled.header`
  min-width: 1440px;
  height: 80px;
  background-color: #2ac1bc;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  padding: 0 60px;
  margin: 0 auto;
`;

// TODO : h1 태그에 글자가 없어서 접근성 요소 넣어야함
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
  color: #ffffff;
  font-size: 24px;
`;

function Header() {
  const state = useSelector((state) => state.cart);

  return (
    <HeaderWrapper>
      <HeaderDiv>
        <h1>
          <NavLink to="/">
            <LogoImage src={logo} alt="신세티케의 장바구니 로고" />
          </NavLink>
        </h1>

        <nav>
          <NavUl>
            <li>
              <NavItem to="/cart">장바구니 {state.length ? <Badge number={state.length} /> : ''}</NavItem>
            </li>
            <li>
              <NavItem to="/orders">주문목록</NavItem>
            </li>
          </NavUl>
        </nav>
      </HeaderDiv>
    </HeaderWrapper>
  );
}

export default Header;
