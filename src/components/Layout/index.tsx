import { Outlet } from 'react-router';
import Header from '../Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
