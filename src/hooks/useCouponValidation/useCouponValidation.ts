import { useRecoilValue } from "recoil";
import { couponCheckedAtom } from "../../recoil/atom/atom";
import { checkedCartItemsSelector, orderPriceSelector, shippingFeeSelector } from "../../recoil/selector/selector";
import { Coupon } from "../../types/coupon";
import { MAX_CHECKED_COUPONS_LENGTH } from "../../constants/setting";

const useCouponValidation = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const checkedCoupons = useRecoilValue(couponCheckedAtom);

  const isCouponValid = (coupon: Coupon) => {
    if (new Date() > new Date(coupon.expirationDate)) {
      return false;
    }

    if (coupon.minimumAmount) {
      if (orderPrice < coupon.minimumAmount) {
        return false;
      }
    }

    if (coupon.buyQuantity && coupon.getQuantity) {
      if (checkedCartItems.every((item) => item.quantity < coupon.buyQuantity + coupon.getQuantity)) {
        return false;
      }
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

    if (coupon.code === "FREESHIPPING") {
      if (shippingFee === 0) {
        return false;
      }
    }

    if (checkedCoupons.length === MAX_CHECKED_COUPONS_LENGTH) {
      if (!checkedCoupons.includes(coupon)) {
        return false;
      }
    }

    return true;
  };

  return { isCouponValid };
};

export default useCouponValidation;
