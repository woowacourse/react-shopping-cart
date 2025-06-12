import OrderContent from '../components/Order/OrderContent';
import { CouponProvider } from '../context/CouponContext';
import { DataProvider } from '../context/DataContext';
import { ShippingProvider } from '../context/ShippingContext';

function OrderConfirmPage() {
  return (
    <DataProvider>
      <CouponProvider>
        <ShippingProvider>
          <OrderContent />
        </ShippingProvider>
      </CouponProvider>
    </DataProvider>
  );
}

export default OrderConfirmPage;
