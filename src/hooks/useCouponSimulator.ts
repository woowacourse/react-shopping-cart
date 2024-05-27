import { useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCouponState } from "@/recoil/coupon";

import useDiscountCalculator from "./useDiscountCalculator";

import { Coupon } from "@/types/cart";

import { COUPONS } from "@/constants/cart";

const useCouponSimulator = () => {
  const [temporaryCoupons, setTemporaryCoupons] = useState<Coupon[]>(
    useRecoilValue(selectedCouponState)
  );
  const setSelectedCoupons = useSetRecoilState(selectedCouponState);

  const { getDiscountAmount } = useDiscountCalculator();

  const handleAddTemporaryCoupon = (coupon: Coupon) => {
    if (temporaryCoupons.length >= COUPONS.maxCouponLengthThreshold) {
      alert(
        `최대 ${COUPONS.maxCouponLengthThreshold}장의 쿠폰을 사용할 수 있습니다.`
      );
      return;
    }

    setTemporaryCoupons((prevCoupons) => [...prevCoupons, coupon]);
  };

  const handleRemoveTemporaryCoupon = (coupon: Coupon) => {
    setTemporaryCoupons((prevCoupons) => {
      return prevCoupons.filter((c) => c.id !== coupon.id);
    });
  };

  const onTemporaryCouponsSubmit = () => {
    setSelectedCoupons(temporaryCoupons);
  };

  const checkSelectedCoupon = (id: number) =>
    temporaryCoupons.some((c) => c.id === id);

  const hasTemporaryCoupons = temporaryCoupons.length > 0;

  const discountAmount = temporaryCoupons.reduce(
    (accDiscountAmount, coupon) => {
      return accDiscountAmount + getDiscountAmount(coupon);
    },
    0
  );

  return {
    checkSelectedCoupon,
    handleAddTemporaryCoupon,
    handleRemoveTemporaryCoupon,
    onTemporaryCouponsSubmit,
    hasTemporaryCoupons,
    discountAmount,
  };
};

export default useCouponSimulator;
