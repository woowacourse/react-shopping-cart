import { useEffect, useState } from "react";
import useCouponSelector from "./useCouponSelect";
import { useRecoilValue } from "recoil";
import {
  checkedCartItemsQuantityAndPriceState,
  shippingFeeState,
  totalCheckedCartItemsPriceState,
} from "../recoil/selectors";
import { CouponInstances } from "../domain/coupons/AbstractCoupon";
import { DiscountType } from "../types/Coupon";

// 낮은 숫자가 우선순위가 높음
const couponPriority: Record<DiscountType, number> = {
  buyXgetY: 0,
  percentage: 1,
  fixed: 2,
  freeShipping: 3,
};

const couponPriorityCompare = (a: CouponInstances, b: CouponInstances) => {
  return couponPriority[a.discountType] - couponPriority[b.discountType];
};

const useCouponDiscount = () => {
  const shippingFee = useRecoilValue(shippingFeeState);
  const itemQuantityAndPrice = useRecoilValue(checkedCartItemsQuantityAndPriceState);
  const totalAmount = useRecoilValue(totalCheckedCartItemsPriceState);

  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedCoupons, handleSelectCoupons] = useCouponSelector();

  useEffect(() => {
    const sortedCoupons = selectedCoupons.sort(couponPriorityCompare);
    const totalDiscountAmount = sortedCoupons.reduce(
      (acc, cur) => acc + cur.discountAmount(totalAmount, shippingFee, itemQuantityAndPrice),
      0
    );

    setDiscountAmount(totalDiscountAmount);
  }, [discountAmount, itemQuantityAndPrice, selectedCoupons, shippingFee, totalAmount]);

  return { selectedCoupons, handleSelectCoupons, discountAmount };
};

export default useCouponDiscount;
