import './index.css';
import { CartPage } from './features/Cart/pages/CartPage';
import { AppLayout } from './shared/components/AppLayout';
import { ToastProvider } from './shared/context/ToastProvider';

export const App = () => {
  return (
    <AppLayout>
      <ToastProvider>
        <CartPage />
      </ToastProvider>
    </AppLayout>
  );
};
