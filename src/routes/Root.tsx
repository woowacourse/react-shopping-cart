import { Outlet } from 'react-router-dom';
import ToastList from '../components/Common/Toast/ToastList';

function Root() {
  return (
    <>
      <ToastList />
      <Outlet />
    </>
  );
}

export default Root;
