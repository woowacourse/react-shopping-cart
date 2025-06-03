import './index.css';
import { CartPage } from './features/Cart/pages/CartPage';
import { AppLayout } from './shared/components/AppLayout/AppLayout';
import { ToastProvider } from './shared/context/ToastProvider';
import { CartProvider } from './features/Cart/context/CartProvider';

export const App = () => {
  return (
    <AppLayout>
      <ToastProvider>
        <CartProvider>
          <CartPage />
        </CartProvider>
      </ToastProvider>
    </AppLayout>
  );
};
