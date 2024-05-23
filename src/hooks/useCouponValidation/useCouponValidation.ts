import { useRecoilValue } from "recoil";
import { Coupon } from "../../types/coupon";
import { orderPriceSelector } from "../../recoil/selector/selector";

const useCouponValidation = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);

  const isCouponValid = (coupon: Coupon) => {
    if (new Date() > new Date(coupon.expirationDate)) {
      return false;
    }

    if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) {
      return false;
    }

    if (coupon.availableTime) {
      const now = new Date();

      const [startHour, startMinute, startSecond] = coupon.availableTime.start.split(":").map(Number);
      const [endHour, endMinute, endSecond] = coupon.availableTime.end.split(":").map(Number);

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond);

      if (now < startTime || now > endTime) {
        return false;
      }
    }

    return true;
  };

  return {
    isCouponValid,
  };
};

export default useCouponValidation;
