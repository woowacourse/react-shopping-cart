import { COUPON_DISCOUNT_TYPE } from "@/constants";
import { cartState, couponEachCheckState, couponsState } from "@/store/atom/atoms";
import { isOver2CouponsCheckedState, orderAmountState } from "@/store/selector/selectors";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const useCoupon = (id: number) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const isOver2CouponsChecked = useRecoilValue(isOver2CouponsCheckedState);
  const [isCouponChecked, setIsCouponChecked] = useRecoilState(couponEachCheckState(id));
  const coupons = useRecoilValue(couponsState);
  const coupon = coupons.find((coupon) => coupon.id === id);
  const orderAmount = useRecoilValue(orderAmountState);
  const cartItems = useRecoilValue(cartState);

  const handleCheckClick = () => {
    setIsCouponChecked((prev) => !prev);
  };

  if (!coupon) {
    throw new Error(`ERROR: 존재하지 않는 쿠폰 ID입니다. ${id}`);
  }

  useEffect(() => {
    //2개 이상 체크되지 않고, 되었다면 해당 쿠폰이 체크된 경우 활성화
    const isNotOver2OrChecked = !isOver2CouponsChecked || isCouponChecked;
    //최소 주문금액이 넘었을 경우 체크 활성화
    const isOverMinimumAmount = !coupon?.minimumAmount || coupon.minimumAmount <= orderAmount;
    //buyXgetY 확인
    const isValidBuyXGetY =
      coupon.discountType !== COUPON_DISCOUNT_TYPE.BuyXgetY ||
      cartItems.some((cartItem) => cartItem.quantity >= coupon.buyQuantity);
    //유효기간이 안지난 쿠폰만 활성화
    const currentDate = new Date();
    const couponExpirationDate = new Date(coupon.expirationDate);
    const isValidPeriod = currentDate <= couponExpirationDate;
    //사용 시간에 포함된 쿠폰만 활성화
    const isValidTime = () => {
      if (!coupon.availableTime) return true;
      const timeString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${currentDate.getDate()}T`;
      const startTime = new Date(timeString + coupon.availableTime.start + "Z");
      const endTime = new Date(timeString + coupon.availableTime.end + "Z");
      return currentDate >= startTime && currentDate <= endTime;
    };
    //배송비가 청구되는 경우 쿠폰 활성화
    const isFreeShipCouponValid = coupon.discountType !== "freeShipping" || orderAmount < 100_000;

    if (
      isNotOver2OrChecked &&
      isOverMinimumAmount &&
      isValidBuyXGetY &&
      isValidPeriod &&
      isValidTime() &&
      isFreeShipCouponValid
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isOver2CouponsChecked, isCouponChecked, coupon, orderAmount, cartItems]);

  return { isDisabled, isChecked: isCouponChecked, handleCheckClick };
};

export default useCoupon;
