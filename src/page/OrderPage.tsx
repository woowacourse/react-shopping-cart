import { STEP_NAME, StepName } from "@/constants/steps";

import { useMemo, useState } from "react";
import { FunnelProps, StepProps } from "@/hooks/Funnel/useFunnel";
import { useCartContext } from "@/components/Cart/CartContext";
import { useCouponFetch } from "@/hooks/Coupon/useCouponFetch";
import { useBestCouponCombo } from "@/hooks/Coupon/useBestCouponCombo";
import { useCouponSelection } from "@/hooks/Coupon/useCouponSelection";
import { useCouponDiscount } from "@/hooks/Coupon/useCouponDiscount";

import CartLayout from "@/layout/CartLayout";
import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import CartContent from "@/components/Cart/CartContent/CartContent";
import CartContentActions from "@/components/Cart/CartContentActions/CartContentActions";
import OrderConfirmation from "./OrderConfirmation/OrderConfirmation";
import OrderConfirmationActions from "./OrderConfirmation/Actions/OrderConfirmationActions";
import OrderConfirmationHeader from "@/components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader";
import Spinner from "@/components/common/Spinner";

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

  const [isInIsland, setIsInIsland] = useState(false);

  const { couponsData, couponsFetchLoading } = useCouponFetch();

  const allCouponsResult = useBestCouponCombo({
    coupons: couponsData || [],
    selectedShoppingCartItems: selectedCartItems,
    isIsland: isInIsland,
  });

  const initialOptimalCouponIds = useMemo(() => {
    return new Set(allCouponsResult.appliedCoupons.map((coupon) => coupon.id));
  }, [allCouponsResult.appliedCoupons]);

  const couponSelection = useCouponSelection(initialOptimalCouponIds);

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
            couponSelection={couponSelection}
            result={result}
            isInIsland={isInIsland}
            setIsInIsland={setIsInIsland}
          >
            {couponsFetchLoading ? (
              <Spinner />
            ) : (
              <>
                <OrderConfirmation.BOGOOfferNotice />
                <OrderConfirmation.Header />
                <OrderConfirmation.ItemList />
                <OrderConfirmation.CouponSelection />
                <OrderConfirmation.ShippingIsland />
                <OrderConfirmation.PriceDetails />
              </>
            )}
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
