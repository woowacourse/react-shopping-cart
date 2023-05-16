import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
