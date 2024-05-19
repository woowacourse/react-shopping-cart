import OrderConfirmFooter from "../components/Footer/OrderConfirmFooter/OrderConfirmFooter";
import Header from "../components/Header/Header";
import OrderContainer from "../components/Main/Order/OrderContainer";

const OrderConfirmPage = () => {
  return (
    <>
      <Header />
      <OrderContainer />
      <OrderConfirmFooter />
    </>
  );
};

export default OrderConfirmPage;
