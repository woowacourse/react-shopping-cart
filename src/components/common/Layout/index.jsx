import React from 'react';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import Header from 'components/common/Header';

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100vh;
  `,
};

const Layout = () => {
  return (
    <Styled.Wrapper>
      <Header />
      <Outlet />
    </Styled.Wrapper>
  );
};

export default Layout;
