import { OrderProvider } from "./contexts/OrderContext";
import OrderPageContent from "./OrderPageContent";

const OrderPage = () => {
  return (
    <OrderProvider>
      <OrderPageContent />
    </OrderProvider>
  );
};

export default OrderPage;
