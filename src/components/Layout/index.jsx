import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import * as S from './styles';

function Layout() {
  return (
    <S.Container>
      <Header />
      <S.Content>
        <Outlet />
      </S.Content>
      <Footer />
    </S.Container>
  );
}

export default Layout;
