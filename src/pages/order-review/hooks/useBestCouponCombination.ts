// hooks/useBestCouponCombination.ts
import { CouponContent } from '@/api/type';
import { useOrderListContext } from '@/pages/shopping-cart/context/OrderListProvider';
import { getDiscountByCouponId } from '../utils/getDiscountByCouponId';

export const useBestCouponCombination = (
  availableCoupons: CouponContent[],
  allCouponCombinationIds: number[][],
  isJejuOrRemoteArea: boolean
) => {
  const { selectedItems, orderPrice } = useOrderListContext();

  const combinations = allCouponCombinationIds.map((couponIds) => {
    const selectedCoupons = couponIds
      .map((id) => availableCoupons.find((c) => c.id === id))
      .filter(Boolean) as CouponContent[];

    let totalDiscount = 0;
    for (const coupon of selectedCoupons) {
      totalDiscount += getDiscountByCouponId(
        coupon,
        orderPrice,
        selectedItems,
        isJejuOrRemoteArea
      );
    }

    return {
      couponIds,
      discount: totalDiscount,
    };
  });

  const bestCombination =
    combinations.length > 0
      ? combinations.reduce((prev, curr) =>
          curr.discount > prev.discount ? curr : prev
        )
      : { couponIds: [], discount: 0 };

  return {
    combinations,
    bestCombination,
  };
};
