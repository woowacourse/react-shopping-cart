import React, { PropsWithChildren, Suspense } from 'react';
import Header from './components/common/Header/Header';
import PageName from './components/common/PageName/PageName';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Flex from './components/common/Flex';
import styled from 'styled-components';
import ProductPage from './pages/ProductPage/ProductPage';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Root>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
    </Root>
  );
};

const Root = styled.div`
  width: 100vw;
`;

const Content = () => {
  return (
    <Flex dir="column" width="80%" style={{ margin: '0 auto' }}>
      <PageName />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </Flex>
  );
};

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route element={<Content />}>
            <Route index element={<ProductPage />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
