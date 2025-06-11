// 기존 유틸리티 함수들
export { getBaseShipping } from "./getBaseShipping";
export { seekMostExpensiveBOGOItem } from "./seekMostExpensiveBOGOItem";
export { validateCoupon } from "./validateCoupon";
export { partitionCoupons } from "./partitionCoupons";

// 새로 추가된 유틸리티 함수들
export { calculateOrderTotal } from "./calculateOrderTotal";
export {
  calculateCouponDiscount,
  type CouponDiscountResult,
} from "./calculateCouponDiscount";
export {
  evaluateCouponEffectiveness,
  type CouponWithEffectiveness,
} from "./evaluateCouponEffectiveness";
export { selectOptimalCoupons } from "./selectOptimalCoupons";
export {
  calculateFinalTotal,
  type FinalCalculationResult,
} from "./calculateFinalTotal";
