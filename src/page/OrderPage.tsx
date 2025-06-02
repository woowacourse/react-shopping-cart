import CartContent from "@/components/Cart/CartContent/CartContent";
import { FunnelProps, StepProps } from "@/hooks/Funnel/useFunnel";
import OrderConfirmation from "./OrderConfirmation/OrderConfirmation";

import { useCartContext } from "@/components/Cart/CartContext";
import CartLayout from "@/layout/CartLayout";
import OrderConfirmationActions from "./OrderConfirmation/Actions/OrderConfirmationActions";
import { STEP_NAME, StepName } from "@/constants/steps";
import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import * as Styled from "./OrderPage.style";
import useCouponFetch from "@/hooks/Coupon/useCouponFetch";
import useCouponApply from "@/hooks/Coupon/useCouponApply";

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
  const result = useCouponApply({
    coupons: couponsData || [],
    selectedShoppingCartItems: selectedCartItems,
  });
  return (
    <CartLayout>
      <Funnel>
        <Step name="구매품 선택">
          <CartHeader />
          <CartContent.Root>
            <CartContent.Loading />
            <CartContent.Header />
            <CartContent.Items />
          </CartContent.Root>
        </Step>
        <Step name="쿠폰 적용 및 결제">
          <OrderConfirmation
            selectedCartItems={selectedCartItems}
            onPrev={() => prevClickHandler("구매품 선택")}
            result={result}
            couponsData={couponsData}
          />
        </Step>
      </Funnel>

      {currentStep === STEP_NAME.SELECT_PRODUCT && (
        <Styled.FixedFooter>
          <CartContent.Actions
            onNext={() => nextClickHandler("쿠폰 적용 및 결제")}
          />
        </Styled.FixedFooter>
      )}
      {currentStep === STEP_NAME.APPLY_COUPON_AND_PAYMENT && (
        <OrderConfirmationActions
          selectedCartItems={selectedCartItems}
          finalPrice={result.orderTotal - result.discountTotal}
        />
      )}
    </CartLayout>
  );
}
export default OrderPage;
