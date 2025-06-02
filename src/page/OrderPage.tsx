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
import { useCouponApply } from "@/hooks/Coupon/useCouponApply";
import useCouponSelection from "@/hooks/Coupon/useCouponSelection";
import { useMemo } from "react";

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

  // 모든 쿠폰으로 초기 계산하여 최적의 쿠폰들 찾기
  const allCouponsResult = useCouponApply({
    coupons: couponsData || [],
    selectedShoppingCartItems: selectedCartItems,
  });

  // 초기에 가장 좋은 쿠폰들을 자동으로 적용
  const initialOptimalCoupons = useMemo(() => {
    return new Set(allCouponsResult.appliedCoupons.map((c) => c.id));
  }, [allCouponsResult.appliedCoupons]);

  // 쿠폰 선택 상태 관리 (초기값으로 최적 쿠폰들 설정)
  const { handleSelectCoupon, selectedCouponIds, isSelectedToLimit } =
    useCouponSelection(initialOptimalCoupons);

  // 선택된 쿠폰만 필터링
  const selectedCoupons = useMemo(
    () =>
      couponsData?.filter((coupon) => selectedCouponIds.has(coupon.id)) || [],
    [couponsData, selectedCouponIds]
  );

  // 선택된 쿠폰들로 실시간 계산
  const result = useCouponApply({
    coupons: selectedCoupons,
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
            couponsData={couponsData}
            result={result}
            couponSelection={{
              handleSelectCoupon,
              selectedCouponIds,
              isSelectedToLimit,
            }}
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
          finalPrice={result.finalTotal}
        />
      )}
    </CartLayout>
  );
}
export default OrderPage;
