import CartContent from "@/components/Cart/CartContent/CartContent";
import { CartProvider } from "@/components/Cart/CartProvider";
import { FunnelProps, StepProps } from "@/hooks/Funnel/useFunnel";
import OrderConfirmation from "./OrderConfirmation/OrderConfirmation";

import { useCartContext } from "@/components/Cart/CartContext";
import CartLayout from "@/layout/CartLayout";

export interface ProfileSetupInterface {
  nextClickHandler: (nextStep: string) => void;
  prevClickHandler: (prevStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

// OrderConfirmation에서 selectedCartItems를 사용하는 컴포넌트
const OrderConfirmationWrapper = ({ onPrev }: { onPrev: () => void }) => {
  const { selectedCartItems } = useCartContext();
  return (
    <OrderConfirmation cartItemsData={selectedCartItems} onPrev={onPrev} />
  );
};

function OrderPage({
  nextClickHandler,
  prevClickHandler,
  Funnel,
  Step,
}: ProfileSetupInterface) {
  return (
    <CartLayout>
      <Funnel>
        <Step name="구매품 선택">
          <CartProvider onNext={() => nextClickHandler("쿠폰 적용 및 결제")}>
            <CartContent.Root>
              <CartContent.Loading />
              <CartContent.Header />
              <CartContent.Items />
              <CartContent.Actions />
            </CartContent.Root>
          </CartProvider>
        </Step>
        <Step name="쿠폰 적용 및 결제">
          <CartProvider onNext={() => {}}>
            <OrderConfirmationWrapper
              onPrev={() => prevClickHandler("구매품 선택")}
            />
          </CartProvider>
        </Step>
      </Funnel>
    </CartLayout>
  );
}
export default OrderPage;
