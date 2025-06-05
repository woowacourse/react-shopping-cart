import { DataProvider } from '../context/DataContext';
import CartContent from '../components/Cart/CartContent';
import { CartSelectionProvider } from '../context/CartSelectContext';

function CartPage() {
  return (
    <DataProvider>
      <CartSelectionProvider>
        <CartContent />
      </CartSelectionProvider>
    </DataProvider>
  );
}

export default CartPage;
