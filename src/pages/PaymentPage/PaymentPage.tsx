import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Header, Footer, PaymentConfirm } from "../../components";
import { AppLayout } from "../../layouts";

const PaymentPage = () => {
  return (
    <AppLayout>
      <Header />
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Suspense fallback={<div>Loading</div>}>
          <PaymentConfirm />
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </AppLayout>
  );
};

export default PaymentPage;
