import { useLocation } from 'react-router';
import OrderContent from '../components/Order/OrderContent';
import { useData } from '../context/DataContext';
import { OrderProvider } from '../context/OrderContext';
import { CartProduct } from '../types/cart';
import { getCartItems } from '../apis/cart';
import { calculateCartPrice } from '../utils/calculator';
import { CouponProvider } from '../context/CouponContext';
import { ShippingProvider } from '../context/ShippingContext';

function OrderConfirmPage() {
  const { state } = useLocation();
  const { data: cartItems } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  const { price, shippingFee, totalPrice } = calculateCartPrice(cartItems, state.checkedItems);
  const selectedCartItems =
    cartItems?.content?.filter((item: CartProduct) => state.checkedItems.includes(item.id)) ?? [];

  return (
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
  );
}

export default OrderConfirmPage;
