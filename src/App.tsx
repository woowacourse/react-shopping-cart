import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Fallback from './components/common/Fallback';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';
import FetchErrorFallback from './components/common/FetchErrorFallback';

function App() {
  return (
    <Suspense
      fallback={
        <Fallback spinner={<LoadingSpinner />} message="로딩 중입니다..." />
      }
    >
      <ErrorBoundary FallbackComponent={FetchErrorFallback}>
        <Outlet />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
