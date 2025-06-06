// 얼마 할인 됐는가

/**
 * 0. 체크된 쿠폰 개수
 - 쿠폰 최대 개수에 따른 invisible 처리

 *1. 할인 금액
 - 쿠폰 종류별 할인 연산 (x)
 - 종류와 할인 연산 매핑 객체 
 - 총 할인 금액 연산
 - 할인 후 총액 반환
 *
 * 2. validate : 비활성화
 * 만료일은 validate 한가 - 이거 그냥 지우는게 낫지 않나? 만료된건데
 * 최소 주문 금액은 validate 한가 (x)
 * 
 * 단가가 제일 높은 상품의 가격을 갖고 와야 함
 */

// bogo는 그냥 어떤 것이든 2개 이상이면 가능하도록 설정하면 됨

// TODO : 이 validate가 충족되지 않을 경우 그냥 지우도록 설정

import type { CartItemType, CouponType, BogoCoupon } from "../types/response";

export const validateExpirationDate = (expirationDate: string) => {
  const today = new Date();
  const expirationDateObj = new Date(expirationDate);

  return expirationDateObj > today;
};

export const validateMinimumAmount = (
  originTotalPrice: number,
  minimumOrderAmount: number
) => {
  return originTotalPrice >= minimumOrderAmount;
};

export const validateBogoCoupon = (
  orderItems: CartItemType[],
  coupon: BogoCoupon
) => {
  return orderItems.some((item) => item.quantity >= coupon.buyQuantity);
};

export const getValidExpirationCoupons = (couponList: CouponType[]) => {
  return couponList.filter((coupon) => {
    if (!("expirationDate" in coupon)) return true;
    return validateExpirationDate(coupon.expirationDate);
  });
};

const getValidMinimumAmountCoupons = (
  couponList: CouponType[],
  originTotalPrice: number
) => {
  return couponList.filter((coupon) => {
    if (!("minimumAmount" in coupon)) return true;
    return validateMinimumAmount(originTotalPrice, coupon.minimumAmount);
  });
};

const getValidBogoCoupons = (
  couponList: CouponType[],
  orderItems: CartItemType[]
) => {
  return couponList.filter((coupon) => {
    if (!("buyQuantity" in coupon)) return true;
    return validateBogoCoupon(orderItems, coupon);
  });
};

export const getValidCoupons = (
  couponList: CouponType[],
  originTotalPrice: number,
  orderItems: CartItemType[]
) => {
  const validExpirationDateCouponList = getValidExpirationCoupons(couponList);
  const validMinimumAmountCouponList = getValidMinimumAmountCoupons(
    validExpirationDateCouponList,
    originTotalPrice
  );
  const validBogoCouponList = getValidBogoCoupons(
    validMinimumAmountCouponList,
    orderItems
  );

  return validBogoCouponList;
};

export const calculateFixedDiscountCoupon = (
  originTotalPrice: number,
  discount: number
) => {
  return originTotalPrice - discount;
};

export const calculateBogoCoupon = (
  originTotalPrice: number,
  productPrice: number,
  buyQuantity: number
) => {
  const totalDiscount = productPrice * buyQuantity;
  const totalPriceAfterDiscount = originTotalPrice - totalDiscount;
  return {
    totalDiscount,
    totalPriceAfterDiscount,
  };
};

export const calculateFreeShippingCoupon = (
  originTotalPrice: number,
  freeShippingPrice: number
) => {
  const totalDiscount = freeShippingPrice;
  const totalPriceAfterDiscount = originTotalPrice - totalDiscount;
  return {
    totalDiscount,
    totalPriceAfterDiscount,
  };
};

export const calculatePercentageCoupon = (
  originTotalPrice: number,
  percentage: number
) => {
  const totalDiscount = originTotalPrice * (percentage / 100);
  const totalPriceAfterDiscount = originTotalPrice - totalDiscount;
  return {
    totalDiscount,
    totalPriceAfterDiscount,
  };
};

export const mappingCouponCalculator = {
  fixed: calculateFixedDiscountCoupon,
  buyXgetY: calculateBogoCoupon,
  freeShipping: calculateFreeShippingCoupon,
  percentage: calculatePercentageCoupon,
};
