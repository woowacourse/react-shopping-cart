import { useState } from "react";
import { CouponInstances } from "../domain/coupons/AbstractCoupon";
import ORDER from "../constants/order";

const useCouponSelector = () => {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponInstances[]>([]);

  const handleSelectCoupons = (couponInstance: CouponInstances) => {
    if (selectedCoupons.includes(couponInstance)) {
      const filteredCoupon = selectedCoupons.filter((coupon) => coupon !== couponInstance);

      return setSelectedCoupons(filteredCoupon);
    }

    if (selectedCoupons.length >= ORDER.maxCouponCount) return;

    setSelectedCoupons((prevSelectedCoupons) => [...prevSelectedCoupons, couponInstance]);
  };

  return [selectedCoupons, handleSelectCoupons] as const;
};

export default useCouponSelector;
