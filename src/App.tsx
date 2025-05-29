import './index.css';
import { CartPage } from './features/Cart/pages/CartPage';
import { AppLayout } from './shared/components/AppLayout';
import { ShoppingContext } from './shared/context/shoppingContext';
import { ToastProvider } from './shared/context/ToastProvider';

export const App = () => {
  return (
    <AppLayout>
      <ToastProvider>
        <ShoppingContext>
          <CartPage />
        </ShoppingContext>
      </ToastProvider>
    </AppLayout>
  );
};
