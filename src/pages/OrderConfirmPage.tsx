import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import PurchaseLayout from "@/layouts/PurchaseLayout";

import ErrorFallback from "@/components/_common/ErrorFallback";
import { Header, Loading } from "@/components/index";
import { NavigationButton, BackButton } from "@/components/button";
import OrderContent from "@/components/order/OrderContent";

import { ROUTE_PATH } from "@/constants/route";
import { selectedCartItemsState } from "@/stores/cartItemSelections";
import { useRecoilValue } from "recoil";
import { postOrders } from "@/apis/order";

const OrderConfirmPage = () => {
  const navigate = useNavigate();
  const selectedCartItems = useRecoilValue(selectedCartItemsState);
  const selectedCartItemIds = selectedCartItems.map((item) => item.id);

  const handlePaymentButtonClick = async () => {
    try {
      await postOrders(selectedCartItemIds);
    } catch (error) {
      console.error("Failed to post orders:", error);
    }
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
            onButtonClick={handlePaymentButtonClick}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default OrderConfirmPage;
