import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/@common/Header';
import Box from 'components/@common/Box';

const Layout = () => {
  return (
    <Box w="100%" h="100vh">
      <Header />
      <Styled.Content>
        <Outlet />
      </Styled.Content>
    </Box>
  );
};

const Styled = {
  Content: styled.div`
    max-width: 1260px;
    margin: 0 auto;
    padding: 60px 0 100px;
  `,
};

export default Layout;
