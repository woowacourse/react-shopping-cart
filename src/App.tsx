import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Fallback from './components/common/Fallback';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  return (
    <Suspense
      fallback={
        <Fallback spinner={<LoadingSpinner />} message="로딩 중입니다..." />
      }
    >
      <div className="app">
        <Outlet />
      </div>
    </Suspense>
  );
}

export default App;
