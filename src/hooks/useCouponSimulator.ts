import { useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCouponState } from "@/recoil/coupon";

import useDiscountCalculator from "./useDiscountCalculator";

import { Coupon } from "@/types/cart";

const useCouponSimulator = () => {
  const setSelectedCoupons = useSetRecoilState(selectedCouponState);
  const [temporaryCoupons, setTemporaryCoupons] = useState<Coupon[]>(
    useRecoilValue(selectedCouponState)
  );

  console.log(temporaryCoupons);

  const { getDiscountAmount } = useDiscountCalculator();

  const handleAddCoupon = (coupon: Coupon) => {
    if (temporaryCoupons.length >= 2) {
      alert("최대 2장의 쿠폰을 사용할 수 있습니다.");
      return;
    }

    setTemporaryCoupons((prevCoupons) => [...prevCoupons, coupon]);
  };

  const handleRemoveCoupon = (coupon: Coupon) => {
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
    handleAddCoupon,
    handleRemoveCoupon,
    onTemporaryCouponsSubmit,
    hasTemporaryCoupons,
    discountAmount,
  };
};

export default useCouponSimulator;
