import { useEffect } from "react";
import { useCouponManagerProvider } from "../../../contexts/CouponManagerProvider";
import { isFreeShippingCoupon } from "./utils";
import { CouponType } from "../../../types/coupon";

interface UseRemoveDisabledFreeShippingCouponProps {
  disabled: boolean;
  couponData: CouponType;
}

export default function useRemoveDisabledFreeShippingCoupon({
  disabled,
  couponData,
}: UseRemoveDisabledFreeShippingCouponProps) {
  const { removeCoupon } = useCouponManagerProvider();

  useEffect(() => {
    if (disabled && isFreeShippingCoupon(couponData)) {
      removeCoupon(couponData);
    }
  }, [disabled, removeCoupon, couponData]);
}
