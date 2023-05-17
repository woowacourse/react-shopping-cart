import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from '../components/Header';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 24px;

  max-width: 1300px;
`;

const Root = () => {
  return (
    <>
      <Header />
      <Content>
        <Suspense fallback={<div>로딩중...</div>}>
          <Outlet />
        </Suspense>
      </Content>
    </>
  );
};

export default Root;
