import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import * as Styled from './styles';

function Layout() {
  return (
    <Styled.Container>
      <Header />
      <Styled.Content>
        <Outlet />
      </Styled.Content>
      <Footer />
    </Styled.Container>
  );
}

export default Layout;
