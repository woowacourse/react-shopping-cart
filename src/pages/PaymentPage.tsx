import { Suspense } from "react";
import Header from "../components/Header/Header";
import LoadingPage from "../components/common/LoadingSpinner/LoadingPage";
import PaymentContent from "../components/Payment/PaymentContent/PaymentContent";
import PaymentFooter from "../components/Payment/PaymentFooter/PaymentFooter";

const PaymentPage = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <PaymentContent />
        <PaymentFooter />
      </Suspense>
    </>
  );
};

export default PaymentPage;
