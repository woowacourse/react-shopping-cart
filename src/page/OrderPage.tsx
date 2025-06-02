import CartContent from "@/components/Cart/CartContent/CartContent";
import { CartProvider } from "@/components/Cart/CartProvider";
import { FunnelProps, StepProps } from "@/hooks/Funnel/useFunnel";
import OrderConfirmation from "./OrderConfirmation/OrderConfirmation";

import { useCartContext } from "@/components/Cart/CartContext";
import CartLayout from "@/layout/CartLayout";
import OrderConfirmationActions from "./OrderConfirmation/Actions/OrderConfirmationActions";
import { STEP_NAME, StepName } from "@/constants/steps";
import CartHeader from "@/components/Cart/CartHeader/CartHeader";

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
          <CartProvider>
            <OrderConfirmation
              selectedCartItems={selectedCartItems}
              onPrev={() => prevClickHandler("구매품 선택")}
            />
          </CartProvider>
        </Step>
      </Funnel>

      {currentStep === STEP_NAME.SELECT_PRODUCT && (
        <div className="fixed-footer">
          <CartProvider onNext={() => nextClickHandler("쿠폰 적용 및 결제")}>
            <CartContent.Actions />
          </CartProvider>
        </div>
      )}
      {currentStep === STEP_NAME.APPLY_COUPON_AND_PAYMENT && (
        <div className="fixed-footer">
          <OrderConfirmationActions selectedCartItems={selectedCartItems} />
        </div>
      )}
    </CartLayout>
  );
}
export default OrderPage;
