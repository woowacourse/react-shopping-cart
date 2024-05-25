import { useRecoilValue } from "recoil";
import { checkBuyXgetYSelector } from "./../recoil/coupons";
import { Coupon } from "@/types/coupon";

const useCouponApplicabilityChecker = () => {
  const checkBuyXgetY = useRecoilValue(checkBuyXgetYSelector);
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

    if (coupon.minimumAmount && price) {
      if (coupon.minimumAmount > price) return false;
    }

    if (coupon.buyQuantity && coupon.getQuantity) {
      const minCartQuantity = coupon.buyQuantity + coupon.getQuantity;
      console.log("min");

      if (!checkBuyXgetY(minCartQuantity)) return false;
    }

    //TODO: 나중에 false로 바꾸기
    if (coupon.expirationDate && time) {
      if (!checkExpiration(coupon, time)) return true;
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
