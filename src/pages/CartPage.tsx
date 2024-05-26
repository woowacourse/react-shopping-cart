import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import PurchaseLayout from "@/layouts/PurchaseLayout";
import { Header } from "@/components/index";
import { HomeButton, NavigateButton } from "@/components/button";
import CartContent from "@/components/shoppingCart/CartContent";
import ErrorFallback from "@/components/_common/ErrorFallback";
import Loading from "@/components/_common/Loading";

import { ROUTE_PATH } from "@/constants/route";

const CartPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(ROUTE_PATH.orderConfirm);
  };

  return (
    <>
      <Header>
        <HomeButton />
      </Header>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <PurchaseLayout title="장바구니">
            <CartContent />
          </PurchaseLayout>
          <NavigateButton
            buttonText="주문 확인"
            onButtonClick={handleButtonClick}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default CartPage;
