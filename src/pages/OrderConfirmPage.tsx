import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Header, Footer, OrderConfirm } from "../components";
import CartLayout from "../layouts/Cart";

const OrderConfirmPage = () => {
  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      <Suspense fallback={<div>Loading</div>}>
        <Header />
        <CartLayout>
          <OrderConfirm />
        </CartLayout>
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default OrderConfirmPage;
