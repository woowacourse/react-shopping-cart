import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { evaluateCouponEffectiveness } from "./evaluateCouponEffectiveness";

/**
 * 그리디 방식으로 최적의 쿠폰 조합을 선택합니다.
 * 현재는 최대 2개 쿠폰을 선택하며, 할인 효과가 높은 순서로 정렬된 상위 쿠폰들을 반환합니다.
 *
 * @param coupons 유효한 쿠폰 목록
 * @param cartItems 장바구니 아이템들
 * @param orderTotal 주문 총액
 * @param isIsland 도서산간 지역 여부
 * @param maxCoupons 최대 선택 가능한 쿠폰 개수 (기본값: 2)
 * @returns 선택된 최적의 쿠폰 배열
 */
export const selectOptimalCoupons = (
  coupons: Coupon[],
  cartItems: CartItem[],
  orderTotal: number,
  isIsland: boolean = false,
  maxCoupons: number = 2
): Coupon[] => {
  if (coupons.length === 0) {
    return [];
  }

  const evaluatedCoupons = evaluateCouponEffectiveness(
    coupons,
    cartItems,
    orderTotal,
    isIsland
  );

  // 상위 N개 쿠폰 선택 (그리디 방식)
  // 참고: 현재는 그리디 방식으로 최적 쿠폰 조합을 선택하며,
  // 이는 대부분의 실제 사용 사례에서 충분한 성능과 정확도를 제공합니다.
  // 더 정확한 결과가 필요한 경우 모든 쿠폰 조합을 탐색하는 방식으로 확장 가능합니다.
  return evaluatedCoupons.slice(0, maxCoupons).map((item) => item.coupon);
};
