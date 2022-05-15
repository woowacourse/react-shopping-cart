import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from 'components/common/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Styled.Wrapper>
      <Header />
      <Styled.Content>
        <Outlet />
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100vh;
  `,
  Content: styled.div`
    max-width: 1260px;
    margin: 0 auto;
    padding: 60px 0 100px;
  `,
};

// Layout.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default Layout;
