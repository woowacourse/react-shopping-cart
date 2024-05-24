import { Coupon } from "@/types/coupon";

const useCouponApplicabilityChecker = () => {
  const isCouponApplicable = ({
    coupon,
    price,
    time,
  }: {
    coupon: Coupon;
    price?: number;
    time?: Date;
  }) => {
    if (coupon.minimumAmount && price) {
      if (coupon.minimumAmount > price) return false;
    }

    if (coupon.expirationDate && time) {
      if (!checkExpiration(coupon, time)) return false;
    }

    return true;
  };

  const checkExpiration = (coupon: Coupon, time: Date) => {
    const expiredDate = new Date(coupon.expirationDate).getTime();
    const currentTime = time.getTime();
    if (currentTime > expiredDate) return false;
    return true;
  };

  return { isCouponApplicable };
};

export default useCouponApplicabilityChecker;
