import { Outlet } from 'react-router-dom';
import Header from './common/header/Header';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
