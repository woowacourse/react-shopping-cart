import { Outlet } from 'react-router-dom';

import Header from '../Header';
import { Container } from '../../styles/style';

function HomeLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default HomeLayout;
