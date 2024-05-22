import { cartState, couponEachCheckState, couponsState } from "@/store/atom/atoms";
import { isOver2CouponsCheckedState, totalAmountState } from "@/store/selector/selectors";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const useCoupon = (id: number) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const isOver2CouponsChecked = useRecoilValue(isOver2CouponsCheckedState);
  const isCouponChecked = useRecoilValue(couponEachCheckState(id));
  const coupons = useRecoilValue(couponsState);
  const coupon = coupons.find((coupon) => coupon.id === id);
  const totalAmount = useRecoilValue(totalAmountState);
  const cartItems = useRecoilValue(cartState);

  if (!coupon) {
    throw new Error(`ERROR: 존재하지 않는 쿠폰 ID입니다. ${id}`);
  }

  useEffect(() => {
    //2개 이상 체크되지 않고, 되었다면 해당 쿠폰이 체크된 경우 활성화
    const isNotOver2OrChecked = !isOver2CouponsChecked || isCouponChecked;
    //최소 주문금액이 넘었을 경우 체크 활성화
    const isOverMinimumAmount = !coupon?.minimumAmount || coupon.minimumAmount >= totalAmount;
    //buyXgetY 확인
    const isValidBuyXgetY = !coupon?.buyQuantity || coupon?.buyQuantity >= cartItems.length;
    //유효기간이 안지난 쿠폰만 활성화
    const currentDate = new Date();
    const couponExpirationDate = new Date(coupon.expirationDate);
    const isValidPeriod = currentDate <= couponExpirationDate;

    if (isNotOver2OrChecked && isOverMinimumAmount && isValidBuyXgetY && isValidPeriod) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isOver2CouponsChecked, isCouponChecked, coupon, totalAmount, cartItems]);

  return { isDisabled };
};

export default useCoupon;
