import './index.css';
import { Outlet } from 'react-router-dom';

import { AppLayout } from './shared/components/AppLayout';
import { ToastProvider } from './shared/context/ToastProvider';

export const App = () => {
  return (
    <ToastProvider>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </ToastProvider>
  );
};
