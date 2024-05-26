import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import PurchaseLayout from "@/layouts/PurchaseLayout";

import ErrorFallback from "@/components/_common/ErrorFallback";
import { Header, Loading } from "@/components/index";
import { NavigationButton, BackButton } from "@/components/button";
import OrderContent from "@/components/order/OrderContent";

import { ROUTE_PATH } from "@/constants/route";

const OrderConfirmPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(ROUTE_PATH.paymentConfirm);
  };

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <PurchaseLayout title="주문 확인">
            <OrderContent />
          </PurchaseLayout>
          <NavigationButton
            buttonText="결제하기"
            onButtonClick={handleButtonClick}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default OrderConfirmPage;
