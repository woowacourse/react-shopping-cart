import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Layout/Header';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <>
      <Suspense fallback={<div>장바구니 상태 로딩중...</div>}>
        <Header>SHOP</Header>
      </Suspense>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  width: 100%;
  margin: 60px 0;
  padding: 0 16.66%;
`;

export default Layout;
