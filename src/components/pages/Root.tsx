import { Outlet } from 'react-router-dom';
import Header from '../leafs/Header/Header';

export default function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
