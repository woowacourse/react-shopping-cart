// hooks/useOrderReview.ts
import { useCoupon } from '@/hooks/useCoupon';
import { useApplyCoupon } from '../hooks/useApplyCoupon';
import { useOrderInfo } from './useOrderInfo';
import { useShipping } from './useShipping';

export const useOrderReview = () => {
  const {
    isJejuOrRemoteArea,
    actualShippingFee,
    handleJejuOrRemoteAreaToggle,
  } = useShipping();
  const { typeCount, totalCount, isDisabled } = useOrderInfo();

  const { coupons, isLoading } = useCoupon();
  const { availableCoupons, bestCouponIds, totalDiscount } = useApplyCoupon(
    coupons ?? [],
    isJejuOrRemoteArea
  );

  return {
    // 상태
    isJejuOrRemoteArea,
    isDisabled,

    // 데이터
    coupons,
    isLoading,
    availableCoupons,
    bestCouponIds,
    totalDiscount,
    typeCount,
    totalCount,
    actualShippingFee,

    // 이벤트 핸들러
    handleJejuOrRemoteAreaToggle,
  };
};
