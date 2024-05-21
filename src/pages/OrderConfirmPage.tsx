import { Suspense } from "react";
import OrderConfirmFooter from "../components/Footer/OrderConfirmFooter/OrderConfirmFooter";
import Header from "../components/Header/Header";
import LoadingPage from "./LoadingPage/LoadingPage";
import OrderContent from "../components/OrderConfirm/OrderContent/OrderContent";

const OrderConfirmPage = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <OrderContent />
        <OrderConfirmFooter />
      </Suspense>
    </>
  );
};

export default OrderConfirmPage;
