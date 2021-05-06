import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../asset/logo.svg';

import styled from 'styled-components';

const StyledHeader = styled.header`
  min-width: 1440px;
  height: 80px;
  background-color: #2ac1bc;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
`;

const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  padding: 0 60px;
  margin: 0 auto;
`;

// TODO : h1 태그에 글자가 없어서 접근성 요소 넣어야함
const StyledLogoImage = styled.img`
  width: 360px;
  height: 44px;
`;

const StyledNavUl = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 225px;
`;

const StyledNavItem = styled(NavLink)`
  text-decoration: none;
  color: #ffffff;
  font-size: 24px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledHeaderDiv>
        <h1>
          <Link to="/">
            <StyledLogoImage src={logo} alt="신세티케의 장바구니 로고" />
          </Link>
        </h1>

        <nav>
          <StyledNavUl>
            <li>
              <StyledNavItem to="/cart">장바구니</StyledNavItem>
            </li>
            <li>
              <StyledNavItem to="/orders">주문목록</StyledNavItem>
            </li>
          </StyledNavUl>
        </nav>
      </StyledHeaderDiv>
    </StyledHeader>
  );
}

export default Header;
