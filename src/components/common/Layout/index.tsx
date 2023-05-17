import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import Header from '../Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

const Main = styled.main`
  position: relative;
  top: 80px;
`;

export default Layout;
