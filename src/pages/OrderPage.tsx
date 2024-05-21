import { Suspense } from "react";
import OrderFooter from "../components/Order/OrderFooter/OrderFooter";
import Header from "../components/Header/Header";
import LoadingPage from "../components/common/LoadingSpinner/LoadingPage";
import OrderContent from "../components/Order/OrderContent/OrderContent";

const OrderPage = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <OrderContent />
        <OrderFooter />
      </Suspense>
    </>
  );
};

export default OrderPage;
