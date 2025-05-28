import './index.css';
import { CartPage } from './features/Cart/pages/CartPage';
import { AppLayout } from './shared/components/AppLayout';

export const App = () => {
  return (
    <AppLayout>
      <CartPage />
    </AppLayout>
  );
};
