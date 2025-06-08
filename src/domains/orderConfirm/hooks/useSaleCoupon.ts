import { useEffect, useState } from "react";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";
import { getCouponItems } from "../api/coupon";
import { CouponCode, CouponCodes, CouponType } from "../types/coupon";
import {
  validateDate,
  validateMinimumAmount,
  validateTime,
} from "./utils/validateCoupons";

export function useSaleCoupon() {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponCode[]>([]);
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  const today = new Date();

  /**
   * 쿠폰이 유효한지 확인하는 함수
   * @param orderPrice 주문 금액
   * @param twoPlusOneApplicableItems 2+1 적용 가능한 아이템 목록
   * @returns <Record<CouponCode, boolean>> 쿠폰 코드와 유효성 여부를 매핑한 객체
   */
  const isValidCoupon = ({
    orderPrice,
    twoPlusOneApplicableItems,
  }: {
    orderPrice: number;
    twoPlusOneApplicableItems: CartItemTypes[];
  }): Record<CouponCode, boolean> => {
    return Object.values(CouponCodes).reduce((acc, code) => {
      return {
        ...acc,
        [code]: validateCoupon(code, orderPrice, twoPlusOneApplicableItems),
      };
    }, {} as Record<CouponCode, boolean>);
  };

  const validateCoupon = (
    couponCode: CouponCode,
    orderPrice: number,
    selectedCartItems: CartItemTypes[]
  ) => {
    const couponItem = coupons.find((item) => item.code === couponCode);
    if (!couponItem) return false;

    if (couponItem.code === "BOGO" && selectedCartItems.length === 0)
      return false;

    return (
      validateDate({ expirationDate: couponItem.expirationDate, today }) &&
      (!couponItem.availableTime ||
        validateTime({ availableTime: couponItem.availableTime, today })) &&
      (!couponItem.minimumAmount ||
        validateMinimumAmount({
          minimumAmount: couponItem.minimumAmount,
          orderPrice,
        }))
    );
  };

  /**
   * 쿠폰 선택 핸들러 - 최대 2개의 쿠폰을 선택할 수 있도록 관리
   * @param e 이벤트 객체
   */
  const handleCouponSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const couponCode = e.target.id as CouponCode;

    setSelectedCoupons((prev) => {
      if (prev.includes(couponCode))
        return prev.filter((id) => id !== couponCode);
      if (prev.length < 2) {
        return [...prev, couponCode];
      }
      return prev;
    });
  };

  /**
   * 쿠폰 목록을 가져오는 함수
   */
  useEffect(() => {
    (async () => {
      const data = await getCouponItems();
      setCoupons(data);
    })();
  }, []);

  return {
    handleCouponSelect,
    validateCoupon,
    isValidCoupon,
    selectedCoupons,
    coupons,
  };
}
