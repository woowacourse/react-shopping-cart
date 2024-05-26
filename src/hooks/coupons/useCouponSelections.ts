// 쿠폰 선택을 관리하는 커스텀 훅
import { useRecoilState } from "recoil";
import { selectedCouponsState } from "@/stores/coupons";
import useCouponApplicabilityChecker from "./useCouponApplicabilityChecker";

import { Coupon } from "@/types/coupon";
import { COUPON_SELECTION_RULES } from "@/constants/coupon";

const useCouponSelections = () => {
  const [selectedCoupons, setSelectedCoupons] =
    useRecoilState(selectedCouponsState);
  const { filteredApplicableCoupons } = useCouponApplicabilityChecker();

  const isCouponSelected = (couponId: number) => {
    return selectedCoupons.some(
      (selectedCoupon) => selectedCoupon.id === couponId
    );
  };

  const addSelectedCoupon = (coupon: Coupon) => {
    if (
      selectedCoupons.length < COUPON_SELECTION_RULES.maxSelectCount &&
      !selectedCoupons.includes(coupon)
    ) {
      setSelectedCoupons([...selectedCoupons, coupon]);
    }
  };

  const removeSelectedCoupon = (couponId: number) => {
    setSelectedCoupons(
      selectedCoupons.filter((coupon) => coupon.id !== couponId)
    );
  };

  const toggleCoupon = (coupon: Coupon) => {
    if (isCouponSelected(coupon.id)) {
      removeSelectedCoupon(coupon.id);
    } else {
      addSelectedCoupon(coupon);
    }
  };

  const clearSelectedCoupons = () => {
    setSelectedCoupons([]);
  };

  const isCouponSelectable = (coupon: Coupon) => {
    if (!filteredApplicableCoupons.includes(coupon)) {
      return false;
    }
    if (selectedCoupons.length >= COUPON_SELECTION_RULES.maxSelectCount) {
      return selectedCoupons.includes(coupon);
    }
    return true;
  };

  return {
    selectedCoupons,
    isCouponSelected,
    toggleCoupon,
    clearSelectedCoupons,
    isCouponSelectable,
  };
};

export default useCouponSelections;
