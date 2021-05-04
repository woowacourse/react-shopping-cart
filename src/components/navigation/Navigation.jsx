import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const StyledNavigationContainer = styled.div`
  background-color: #2ac1bc;
`;

const StyledNavigation = styled.nav`
  display: flex;
  max-width: 1440px;
  height: 80px;
  margin: 0 auto;
  padding: 0 60px;
  justify-content: space-between;
`;

const StyledLeftUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledRightUl = styled.ul`
  display: flex;
  width: 280px;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
`;

const Navigation = (props) => (
  <StyledNavigationContainer>
    <StyledNavigation>
      <StyledLeftUl>
        <li>
          <Link to="/">
            <img src={logo} width="100%" height="100%" alt="장바구니" />
          </Link>
        </li>
      </StyledLeftUl>
      <StyledRightUl>
        {/* TODO: 상수화 */}
        <li>
          <Link to="/productList">상품목록</Link>
        </li>
        <li>
          <Link to="/shoppingCart">장바구니</Link>
        </li>
        <li>
          <Link to="/orderList">주문목록</Link>
        </li>
      </StyledRightUl>
    </StyledNavigation>
  </StyledNavigationContainer>
);

export default Navigation;
