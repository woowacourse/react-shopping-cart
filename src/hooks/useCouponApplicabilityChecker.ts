import { useRecoilValue } from "recoil";
import { useCouponFinder } from "./useCouponFinder";
import { useCouponValidator } from "./useCouponValidator";
import { checkedCartItemsSelector } from "../store/selector/selectors";

export const useCouponApplicabilityChecker = () => {
  const checkedItem = useRecoilValue(checkedCartItemsSelector);
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = useCouponValidator();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(targetCoupon)) return false;

    if (targetCoupon.minimumAmount && totalAmount < targetCoupon.minimumAmount) {
      return false;
    }

    if (targetCoupon.buyQuantity && targetCoupon.getQuantity) {
      return checkedItem
        .map((item) => item.quantity >= targetCoupon.buyQuantity! + targetCoupon.getQuantity!)
        .some(Boolean);
    }

    if (targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] = targetCoupon.availableTime.start.split(":").map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end.split(":").map(Number);

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);

      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond);

      if (now < startTime || now > endTime) {
        return false;
      }
    }

    return true;
  };

  return { isCouponApplicable };
};
