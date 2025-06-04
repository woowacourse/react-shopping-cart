import { STEP_NAME, StepName } from "@/constants/steps";

import { useMemo } from "react";
import { FunnelProps, StepProps } from "@/hooks/Funnel/useFunnel";
import { useCartContext } from "@/components/Cart/CartContext";
import { useCouponFetch } from "@/hooks/Coupon/useCouponFetch";
import { useCouponApply } from "@/hooks/Coupon/useCouponApply";
import { useCouponSelection } from "@/hooks/Coupon/useCouponSelection";
import { useCouponDiscount } from "@/hooks/Coupon/useCouponDiscount";

import CartLayout from "@/layout/CartLayout";
import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import CartContent from "@/components/Cart/CartContent/CartContent";
import OrderConfirmation from "./OrderConfirmation/OrderConfirmation";
import OrderConfirmationActions from "./OrderConfirmation/Actions/OrderConfirmationActions";
import CartContentActions from "@/components/Cart/CartContentActions/CartContentActions";
import OrderConfirmationHeader from "@/components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader";

export interface ProfileSetupInterface {
  nextClickHandler: (nextStep: string) => void;
  prevClickHandler: (prevStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
  currentStep: StepName;
}

function OrderPage({
  nextClickHandler,
  prevClickHandler,
  Funnel,
  Step,
  currentStep,
}: ProfileSetupInterface) {
  const { selectedCartItems } = useCartContext();
  const { couponsData } = useCouponFetch();

  const allCouponsResult = useCouponApply({
    coupons: couponsData || [],
    selectedShoppingCartItems: selectedCartItems,
  });

  const initialOptimalCoupons = useMemo(() => {
    return new Set(allCouponsResult.appliedCoupons.map((c) => c.id));
  }, [allCouponsResult.appliedCoupons]);

  const couponSelection = useCouponSelection(initialOptimalCoupons);

  const selectedCoupons = useMemo(
    () =>
      couponsData?.filter((coupon) =>
        couponSelection.selectedCouponIds?.has(coupon.id)
      ),
    [couponsData, couponSelection.selectedCouponIds]
  );
  const result = useCouponDiscount({
    selectedCoupons,
    selectedShoppingCartItems: selectedCartItems,
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
          <CartContent.Root>
            <CartContent.Loading />
            <CartContent.Header />
            <CartContent.Items />
          </CartContent.Root>
        </Step>
        <Step name="쿠폰 적용 및 결제">
          <OrderConfirmation
            selectedCartItems={selectedCartItems}
            couponsData={couponsData}
            result={result}
            couponSelection={couponSelection}
          >
            <OrderConfirmation.Header />
            <OrderConfirmation.ItemList />
            <OrderConfirmation.CouponSelection />
            <OrderConfirmation.ShippingIsland />
            <OrderConfirmation.PriceDetails />
          </OrderConfirmation>
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
