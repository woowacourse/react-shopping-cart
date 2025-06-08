import CouponModal from "./components/CouponModal";
import { CouponModalProvider } from "./contexts/CouponModalContext";
import { OrderProvider } from "./contexts/OrderContext";
import OrderPageContent from "./OrderPageContent";

const OrderPage = () => {
  return (
    <OrderProvider>
      <CouponModalProvider>
        <OrderPageContent />
        <CouponModal />
      </CouponModalProvider>
    </OrderProvider>
  );
};

export default OrderPage;
