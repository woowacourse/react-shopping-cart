const FREE_SHIPPING_THRESHOLD = 100_000;
const COUPON_MINIMUM_AMOUNT = 50_000;
const NORMAL_SHIPPING_FEE = 3_000;
const ISLAND_EXTRA_FEE = 3_000;

export const calculateFreeShippingDiscount = (
  orderPrice: number,
  isJejuOrRemoteArea: boolean
) => {
  if (orderPrice >= FREE_SHIPPING_THRESHOLD) {
    // 10만원 이상: 도서산간이면 3000원, 아니면 0원
    return isJejuOrRemoteArea ? ISLAND_EXTRA_FEE : 0;
  }
  if (orderPrice >= COUPON_MINIMUM_AMOUNT) {
    // 5만원 이상 10만원 미만: 도서산간이면 6000원, 아니면 3000원
    return isJejuOrRemoteArea
      ? NORMAL_SHIPPING_FEE + ISLAND_EXTRA_FEE
      : NORMAL_SHIPPING_FEE;
  }
  // 5만원 미만: 쿠폰 사용 불가, 0원 할인
  return 0;
};
