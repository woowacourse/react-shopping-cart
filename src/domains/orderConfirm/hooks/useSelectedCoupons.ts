import { useMemo, useState } from "react";
import { CouponCode } from "../types/coupon";
import { getDisCountedPrice } from "../utils/getDisCountedPrice";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";
import { getMaxPriceInCart } from "../utils/getMaxPriceInCart";

interface UseSelectedCouponsParams {
  deliveryFee: number;
  orderPrice: number;
  twoPlusOneApplicableItems: CartItemTypes[];
}
export function useSelectedCoupons({
  deliveryFee,
  orderPrice,
  twoPlusOneApplicableItems,
}: UseSelectedCouponsParams) {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponCode[]>([]);

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
        maxPriceInSelectedCart: getMaxPriceInCart({
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
