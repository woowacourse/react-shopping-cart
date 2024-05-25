import { useRecoilValue } from "recoil";
import { checkBuyXgetYSelector } from "@/recoil/coupons";
import { Coupon } from "@/types/coupon";
import { formatHourToDate } from "@/utils/timeHelper";

const useCouponApplicabilityChecker = () => {
  const checkBuyXgetY = useRecoilValue(checkBuyXgetYSelector);
  const isCouponApplicable = ({
    coupon,
    price,
    time = new Date(),
  }: {
    coupon: Coupon;
    price?: number;
    time?: Date;
  }) => {
    if (coupon.minimumAmount && price) {
      if (coupon.minimumAmount > price) return false;
    }

    if (coupon.buyQuantity && coupon.getQuantity) {
      if (!checkBuyXgetY(coupon.id)) return false;
    }

    //TODO: 나중에 false로 바꾸기
    if (coupon.expirationDate && time) {
      if (!checkExpiration(coupon, time)) return false;
    }

    if (coupon.availableTime && time) {
      if (!checkAvailableTime(coupon, time)) return true;
    }

    return true;
  };

  const checkExpiration = (coupon: Coupon, time: Date) => {
    const expiredDate = new Date(coupon.expirationDate).getTime();
    const currentTime = time.getTime();
    if (currentTime > expiredDate) return false;
    return true;
  };

  const checkAvailableTime = (coupon: Coupon, time: Date) => {
    const { start, end } = coupon.availableTime!;

    const startParts = start.split(":").map(Number);
    const endParts = end.split(":").map(Number);

    const startTime = formatHourToDate(time, startParts);
    const endTime = formatHourToDate(time, endParts);

    if (time < startTime || time > endTime) return false;
    return true;
  };

  return { isCouponApplicable };
};

export default useCouponApplicabilityChecker;
