import { useMemo, useState } from "react";
import { CouponCode } from "../types/coupon";
import { getDisCountedPrice } from "../utils/getDisCountedPrice";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";
import { getMaxPriceInSelectedCart } from "../utils/getMaxPriceInSelectedCart";

interface UseSelectedCouponsProps {
  deliveryFee: number;
  orderPrice: number;
  twoPlusOneApplicableItems: CartItemTypes[];
}
export function useSelectedCoupons({
  deliveryFee,
  orderPrice,
  twoPlusOneApplicableItems,
}: UseSelectedCouponsProps) {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponCode[]>([]);

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

  const discountedPrice = useMemo(
    () =>
      getDisCountedPrice({
        deliveryFee,
        orderPrice,
        maxPriceInSelectedCart: getMaxPriceInSelectedCart({
          selectedCartItems: twoPlusOneApplicableItems,
        }),
        selectedCoupons,
      }),
    [deliveryFee, orderPrice, twoPlusOneApplicableItems, selectedCoupons]
  );

  return {
    handleCouponSelect,
    selectedCoupons,
    discountedPrice,
  };
}
