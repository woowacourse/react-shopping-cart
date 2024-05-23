import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Header, Footer, PaymentConfirm } from "../../components";
import { AppLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <Header />
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Suspense fallback={<div>Loading</div>}>
          <PaymentConfirm />
        </Suspense>
      </ErrorBoundary>
      <Footer onClick={() => navigate("/")}>장바구니로 돌아가기</Footer>
    </AppLayout>
  );
};

export default PaymentPage;
