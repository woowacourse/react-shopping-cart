import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { PATH } from '../../constants/path';

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
          <Link to={PATH.HOME}>
            <img src={logo} width="80%" height="80%" alt="메인 로고" />
          </Link>
        </li>
      </Logo>
      <Menu>
        <li>
          <Link to={PATH.PRODUCT_LIST}>상품목록</Link>
        </li>
        <li>
          <Link to={PATH.SHOPPING_CART}>장바구니</Link>
        </li>
        <li>
          <Link to={PATH.ORDER_LIST}>주문목록</Link>
        </li>
      </Menu>
    </Content>
  </Container>
);

export default Navigation;
