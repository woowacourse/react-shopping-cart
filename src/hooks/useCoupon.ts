import { COUPON_DISCOUNT_TYPE } from "@/constants";
import { cartState, couponEachCheckState, couponsState } from "@/store/atom/atoms";
import { isOver2CouponsCheckedState, orderAmountState } from "@/store/selector/selectors";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useCheckBuyXGetY = (coupon: Coupon) => {
  const cartItems = useRecoilValue(cartState);
  return (
    coupon.discountType !== COUPON_DISCOUNT_TYPE.BuyXgetY ||
    cartItems.some((cartItem) => cartItem.quantity >= coupon.buyQuantity)
  );
};

const checkValidDate = (coupon: Coupon) => {
  const currentDate = new Date();
  const couponExpirationDate = new Date(coupon.expirationDate);
  return currentDate <= couponExpirationDate;
};

const checkValidHour = (coupon: Coupon) => {
  const currentDate = new Date();
  if (!coupon.availableTime) return true;
  const timeString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentDate.getDate()}T`;
  const startTime = new Date(timeString + coupon.availableTime.start);
  const endTime = new Date(timeString + coupon.availableTime.end);
  return currentDate >= startTime && currentDate <= endTime;
};

const useCheckCouponDisabled = (coupon: Coupon, id: number) => {
  const [disabled, setDisabled] = useState(true);
  const orderAmount = useRecoilValue(orderAmountState);
  const isOver2CouponsChecked = useRecoilValue(isOver2CouponsCheckedState);
  const isCouponChecked = useRecoilValue(couponEachCheckState(id));

  //2개 이상 체크되지 않고, 되었다면 해당 쿠폰이 체크된 경우 활성화
  const isNotOver2OrChecked = !isOver2CouponsChecked || isCouponChecked;
  //최소 주문금액이 넘었을 경우 체크 활성화
  const isOverMinimumAmount = !coupon?.minimumAmount || coupon.minimumAmount <= orderAmount;
  //buyXgetY 확인
  const isValidBuyXGetY = useCheckBuyXGetY(coupon);
  //유효기간이 안지난 쿠폰만 활성화
  const isValidPeriod = checkValidDate(coupon);
  //사용 시간에 포함된 쿠폰만 활성화
  const isValidTime = checkValidHour(coupon);
  //배송비가 청구되는 경우 쿠폰 활성화
  const isFreeShipCouponValid = coupon.discountType !== "freeShipping" || orderAmount < 100_000;
  useEffect(() => {
    setDisabled(
      !(
        isNotOver2OrChecked &&
        isOverMinimumAmount &&
        isValidBuyXGetY &&
        isValidPeriod &&
        isValidTime &&
        isFreeShipCouponValid
      )
    );
  }, [isNotOver2OrChecked, isOverMinimumAmount, isValidBuyXGetY, isValidPeriod, isValidTime, isFreeShipCouponValid]);

  return { disabled, isCouponChecked };
};

const useCoupon = (
  id: number
): {
  disabled: boolean;
  isChecked: boolean;
  handleCheckClick: () => void;
} => {
  const setIsCouponChecked = useSetRecoilState(couponEachCheckState(id));
  const coupons = useRecoilValue(couponsState);
  const coupon = coupons.find((coupon) => coupon.id === id);

  const handleCheckClick = () => {
    setIsCouponChecked((prev) => !prev);
  };

  if (!coupon) {
    throw new Error(`ERROR: 존재하지 않는 쿠폰 ID입니다. ${id}`);
  }

  const { disabled, isCouponChecked } = useCheckCouponDisabled(coupon, id);

  return { disabled, isChecked: isCouponChecked, handleCheckClick };
};

export default useCoupon;
