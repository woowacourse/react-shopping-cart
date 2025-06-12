import { useLocation } from 'react-router';
import OrderContent from '../components/Order/OrderContent';
import { OrderProvider } from '../context/OrderContext';
import { CartProduct } from '../types/cart';
import { calculateCartPrice } from '../utils/calculator';
import { CouponProvider } from '../context/CouponContext';
import { ShippingProvider } from '../context/ShippingContext';
import { useCartData } from '../utils/fetcher';
import { DataProvider } from '../context/DataContext';

function OrderConfirmPage() {
  const { state } = useLocation();
  const { data: cartItems } = useCartData();

  const { price, shippingFee, totalPrice } = calculateCartPrice(cartItems, state.checkedItems);
  const selectedCartItems =
    cartItems?.content?.filter((item: CartProduct) => state.checkedItems.includes(item.id)) ?? [];

  return (
    <DataProvider>
      <CouponProvider>
        <ShippingProvider>
          <OrderProvider
            selectedCartItems={selectedCartItems}
            price={price}
            shippingFee={shippingFee}
            totalPrice={totalPrice}
          >
            <OrderContent />
          </OrderProvider>
        </ShippingProvider>
      </CouponProvider>
    </DataProvider>
  );
}

export default OrderConfirmPage;
