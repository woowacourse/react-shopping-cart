import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/@common/Header';

const Layout = () => {
  return (
    <Styled.Container>
      <Header />
      <Styled.Content>
        <Outlet />
      </Styled.Content>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
  `,
  Content: styled.div`
    max-width: 1260px;
    margin: 0 auto;
    padding: 60px 0 100px;
  `,
};

export default Layout;
