import { DataProvider } from '../context/DataContext';
import CartContent from '../components/Cart/CartContent';

function CartPage() {
  return (
    <DataProvider>
      <CartContent />
    </DataProvider>
  );
}

export default CartPage;
