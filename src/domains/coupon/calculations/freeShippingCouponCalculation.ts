import { Coupon } from "../types/response";

export const calculateShippingDiscount = (
  coupon: Coupon,
  orderPrice: number,
  shippingFee: number
  // isFarArea: boolean = false
): number => {
  if (coupon.discountType !== "freeShipping") return 0;
  if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) return 0;

  // 무료 배송 쿠폰은 도서산간 추가 배송비까지 포함
  return shippingFee;
};
