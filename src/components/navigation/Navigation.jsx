import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Container = styled.div`
  background-color: #2ac1bc;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.5);
`;

const Content = styled.nav`
  display: flex;
  max-width: 1440px;
  height: 60px;
  margin: 0 auto;
  padding: 0 60px;
  justify-content: space-between;
`;

const Logo = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.ul`
  display: flex;
  width: 280px;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
`;

const Navigation = () => (
  <Container>
    <Content>
      <Logo>
        <li>
          <Link to="/">
            <img src={logo} width="80%" height="80%" alt="메인 로고" />
          </Link>
        </li>
      </Logo>
      <Menu>
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
      </Menu>
    </Content>
  </Container>
);

export default Navigation;
