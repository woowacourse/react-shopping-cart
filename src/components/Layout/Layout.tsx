import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Layout/Header';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <>
      <Suspense fallback={<div>장바구니 상태 로딩중...</div>}>
        <Header>우아한장바구니</Header>
      </Suspense>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 60px 0;
  padding: 0 16.66%;

  @media (max-width: 1280px) {
    padding: 0 8.33%;
  }

  @media (max-width: 768px) {
    padding: 0 4.16%;
    margin-bottom: 0;
  }
`;

export default Layout;
