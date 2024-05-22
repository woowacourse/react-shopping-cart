import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Header, Footer, OrderConfirm, Loading } from "@/components/index";
import BackButton from "@/components/button/BackButton";
import CartLayout from "@/layouts/Cart";
import ErrorFallback from "@/components/_common/ErrorFallback";

const OrderConfirmPage = () => {
  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <CartLayout>
            <OrderConfirm />
          </CartLayout>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default OrderConfirmPage;
