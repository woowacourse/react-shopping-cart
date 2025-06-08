import { Coupon } from "../types/response";

/**
 * 쿠폰 유효성 검사 함수
 */
export const validateCoupon = (
  coupon: Coupon,
  orderPrice: number,
  currentDate: string = new Date().toISOString().split("T")[0],
  currentTime: string = new Date().toTimeString().substring(0, 8)
): boolean => {
  // 쿠폰 만료 여부 검사
  const isNotExpired = coupon.expirationDate >= currentDate;
  if (!isNotExpired) return false;

  // 최소 주문 금액 검사
  const meetsMinimumAmount =
    !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;
  if (!meetsMinimumAmount) return false;

  // 사용 가능 시간대 검사
  if (coupon.availableTime) {
    const { start, end } = coupon.availableTime;
    const isWithinTimeRange = currentTime >= start && currentTime <= end;
    if (!isWithinTimeRange) return false;
  }

  return true;
};
