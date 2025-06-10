import { STEP_NAME } from "@/constants/steps";

import { useFunnelContext } from "@/contexts/FunnelContext";

import CartLayout from "@/layout/CartLayout";
import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import CartContentActions from "@/components/Cart/CartContentActions/CartContentActions";
import OrderConfirmationActions from "./OrderConfirmation/Actions/OrderConfirmationActions";
import OrderConfirmationHeader from "@/components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader";
import { CartDataProvider } from "@/components/Cart/contexts/CartDataContext";
import {
  CartSelectionProvider,
  useSelectedCartItems,
} from "@/components/Cart/contexts/CartSelectionContext";

import ProductSelectionStep from "./OrderPage/ProductSelectionStep";
import CouponPaymentStep from "./OrderPage/CouponPaymentStep";
import { useState } from "react";
import { useCouponManagement } from "@/hooks/Coupon/useCouponManagement";

function OrderPage() {
  return (
    <CartDataProvider>
      <CartSelectionProvider>
        <OrderPageContent />
      </CartSelectionProvider>
    </CartDataProvider>
  );
}

function OrderPageContent() {
  const { nextClickHandler, prevClickHandler, Funnel, Step, currentStep } =
    useFunnelContext();
  const selectedCartItems = useSelectedCartItems();
  const [isInIsland, setIsInIsland] = useState(false);
  const { couponsData, couponsFetchLoading, couponSelection, result } =
    useCouponManagement({
      selectedShoppingCartItems: selectedCartItems,
      isIsland: isInIsland,
    });

  return (
    <CartLayout>
      {currentStep === STEP_NAME.SELECT_PRODUCT && <CartHeader />}
      {currentStep === STEP_NAME.APPLY_COUPON_AND_PAYMENT && (
        <OrderConfirmationHeader
          handleGoBackToHomeButton={() => prevClickHandler("구매품 선택")}
        />
      )}
      <Funnel>
        <Step name="구매품 선택">
          <ProductSelectionStep />
        </Step>
        <Step name="쿠폰 적용 및 결제">
          <CouponPaymentStep
            selectedCartItems={selectedCartItems}
            couponsData={couponsData}
            couponsFetchLoading={couponsFetchLoading}
            couponSelection={couponSelection}
            result={result}
            isInIsland={isInIsland}
            setIsInIsland={setIsInIsland}
          />
        </Step>
      </Funnel>

      {currentStep === STEP_NAME.SELECT_PRODUCT && (
        <CartContentActions
          onNext={() => nextClickHandler("쿠폰 적용 및 결제")}
        />
      )}
      {currentStep === STEP_NAME.APPLY_COUPON_AND_PAYMENT && (
        <OrderConfirmationActions
          selectedCartItems={selectedCartItems}
          finalPrice={result.finalTotal}
        />
      )}
    </CartLayout>
  );
}
export default OrderPage;
