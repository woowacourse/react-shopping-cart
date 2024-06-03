/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import OrderFooter from "../components/Order/OrderFooter/OrderFooter";
import Header from "../components/Header/Header";
import LoadingSpinner from "../components/common/LoadingSpinner/LoadingSpinner";
import OrderContent from "../components/Order/OrderContent/OrderContent";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback/ErrorFallback";

const OrderPage = () => {
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <OrderContent />
          <OrderFooter />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default OrderPage;
