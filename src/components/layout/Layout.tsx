import Header from 'components/Layout/Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { device } from 'styles/mixin';

const Layout = () => {
  return (
    <>
      <Header>SHOP</Header>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};

const PageContainer = styled.main`
  display: flex;
  justify-content: space-around;
  margin: 60px 16.6% 60px;
`;

export default Layout;
