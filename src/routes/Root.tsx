import { Outlet } from 'react-router-dom';
import ToastList from '../components/Common/Toast/ToastList';
import Header from '../components/Header';

function Root() {
  return (
    <>
      <Header />
      <ToastList />
      <Outlet />
    </>
  );
}

export default Root;
