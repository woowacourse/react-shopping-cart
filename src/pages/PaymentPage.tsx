/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import Header from "../components/Header/Header";
import LoadingSpinner from "../components/common/LoadingSpinner/LoadingSpinner";
import PaymentContent from "../components/Payment/PaymentContent/PaymentContent";
import PaymentFooter from "../components/Payment/PaymentFooter/PaymentFooter";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback/ErrorFallback";

const PaymentPage = () => {
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <PaymentContent />
          <PaymentFooter />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PaymentPage;
