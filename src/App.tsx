import { Outlet } from 'react-router-dom';

import Error from './components/common/Error/Error';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import ErrorModal from './components/common/ErrorModal/ErrorModal';
import Header from './components/common/Header/Header';
import { useErrorReset } from './hooks/common/useErrorReset';

const App = () => {
  const { handleErrorReset } = useErrorReset();

  return (
    <ErrorBoundary Fallback={Error} onReset={handleErrorReset}>
      <Header />
      <main>
        <Outlet />
      </main>
      <ErrorModal />
    </ErrorBoundary>
  );
};

export default App;
