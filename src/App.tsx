import './index.css';
import { CartPage } from './features/Cart/pages/CartPage';
import { AppLayout } from './shared/components/AppLayout';
import { ShoppingContext } from './shared/context/shoppingContext';

export const App = () => {
  return (
    <AppLayout>
      <ShoppingContext>
        <CartPage />
      </ShoppingContext>
    </AppLayout>
  );
};
