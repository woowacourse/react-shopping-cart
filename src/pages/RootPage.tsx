import { Outlet } from 'react-router-dom';
import { Header } from '../layouts/Header';

export const RootPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
