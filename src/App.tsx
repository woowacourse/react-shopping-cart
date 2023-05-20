import { Outlet } from 'react-router-dom';

import ErrorModal from './components/common/ErrorModal/ErrorModal';
import Header from './components/common/Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ErrorModal />
    </>
  );
};

export default App;
