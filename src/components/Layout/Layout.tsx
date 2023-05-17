import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Layout/Header';

const Layout = () => {
  return (
    <>
      <Header>SHOP</Header>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  width: 100%;
  height: calc(100vh - var(--header-height));
  margin: 60px 0;
  padding: 0 16.66%;
`;

export default Layout;
