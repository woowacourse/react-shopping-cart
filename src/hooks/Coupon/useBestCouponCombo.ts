import { useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import {
  calculateOrderTotal,
  partitionCoupons,
  selectOptimalCoupons,
  calculateFinalTotal,
} from "@/util/coupon";

export interface CouponApplyResult {
  orderTotal: number;
  shippingFee: number;
  discountTotal: number;
  finalTotal: number;
  appliedCoupons: Coupon[];
}

interface Props {
  coupons?: Coupon[];
  selectedShoppingCartItems: CartItem[];
  isIsland?: boolean;
}

const useBestCouponCombo = ({
  coupons = [],
  selectedShoppingCartItems,
  isIsland = false,
}: Props): CouponApplyResult => {
  // 각각의 useMemo가 어디에 의존하고 있는지, 남겨둡니다.
  // 이렇게 하면 서로간 의존을 최소화 하고, 렌더 사이클을 눈으로 따라갈수 있습니다.
  // 각각의 의존이 상당히 긴밀하게 작동하기 때문에, 꼭 이런 필요가 있을까 하지만,
  // 그래도 명시적으로 남겨두는 것이 코드의 가독성을 높일수 있을것 같습니다.

  /* 1. 주문 총액 계산 - selectedShoppingCartItems에만 의존 */
  const orderTotal = useMemo(() => {
    return calculateOrderTotal(selectedShoppingCartItems);
  }, [selectedShoppingCartItems]);

  /* 2. 유효한 쿠폰 필터링 - coupons와 selectedShoppingCartItems에 의존 */
  const validCoupons = useMemo(() => {
    const partitionResult = partitionCoupons(
      coupons,
      selectedShoppingCartItems
    );
    return partitionResult.validCoupons;
  }, [coupons, selectedShoppingCartItems]);

  /* 3. 최적 쿠폰 조합 선택 - validCoupons, selectedShoppingCartItems, orderTotal, isIsland에 의존 */
  const bestCoupons = useMemo(() => {
    return selectOptimalCoupons(
      Array.from(validCoupons),
      selectedShoppingCartItems,
      orderTotal,
      isIsland
    );
  }, [validCoupons, selectedShoppingCartItems, orderTotal, isIsland]);

  /* 4. 최종 계산 - bestCoupons, selectedShoppingCartItems, isIsland에 의존 */
  const calculationResult = useMemo(() => {
    return calculateFinalTotal(
      bestCoupons,
      selectedShoppingCartItems,
      isIsland
    );
  }, [bestCoupons, selectedShoppingCartItems, isIsland]);

  return {
    orderTotal: calculationResult.orderTotal,
    shippingFee: calculationResult.shippingFee,
    discountTotal: calculationResult.discountTotal,
    finalTotal: calculationResult.finalTotal,
    appliedCoupons: bestCoupons,
  };
};

export { useBestCouponCombo };
