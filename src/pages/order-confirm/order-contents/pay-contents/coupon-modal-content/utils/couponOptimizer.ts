import { Cart } from "../../../../../../api/cart";
import { Coupon } from "../../../../../../api/coupon";
import { calculateCouponDiscount } from "./couponCalculator";

export interface OptimizedCouponResult {
  selectedCouponIds: string[];
  totalDiscount: number;
  finalShippingFee: number;
  hasFreeShipping: boolean;
}

export function optimizeCouponSelection(
  coupons: Coupon[],
  totalCartPrice: number,
  shippingFee: number,
  cartItems: Cart[] | undefined
): OptimizedCouponResult {
  // 사용 가능한 쿠폰만 필터링
  const availableCoupons = coupons.filter((coupon) => {
    switch (coupon.discountType) {
      case "fixed":
      case "freeShipping":
        return totalCartPrice >= coupon.minimumAmount;
      case "buyXgetY":
        return cartItems?.some((item) => item.quantity >= coupon.buyQuantity);
      case "percentage":
        return true;
      default:
        return false;
    }
  });

  // 쿠폰 타입별 우선순위 설정
  const priorityMap: Record<Coupon["discountType"], number> = {
    percentage: 1,
    fixed: 2,
    buyXgetY: 3,
    freeShipping: 4,
  };

  // 우선순위에 따라 쿠폰 정렬
  const sortedCoupons = [...availableCoupons].sort(
    (a, b) => priorityMap[a.discountType] - priorityMap[b.discountType]
  );

  // 최적의 쿠폰 조합 찾기
  let bestResult: OptimizedCouponResult = {
    selectedCouponIds: [],
    totalDiscount: 0,
    finalShippingFee: shippingFee,
    hasFreeShipping: false,
  };

  // 모든 가능한 쿠폰 조합을 시도
  for (let i = 0; i < sortedCoupons.length; i++) {
    for (let j = i + 1; j < sortedCoupons.length; j++) {
      const selectedCouponIds = [sortedCoupons[i].id, sortedCoupons[j].id];
      const result = calculateCouponDiscount(
        sortedCoupons,
        selectedCouponIds,
        totalCartPrice,
        shippingFee,
        cartItems
      );

      if (result.finalDiscount > bestResult.totalDiscount) {
        bestResult = {
          selectedCouponIds,
          totalDiscount: result.finalDiscount,
          finalShippingFee: result.finalShippingFee,
          hasFreeShipping: result.hasFreeShipping,
        };
      }
    }
  }

  return bestResult;
}
