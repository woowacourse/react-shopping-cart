import { couponEachCheckState, couponsState } from "@/store/atom/atoms";
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

  //2개 이상 체크되지 않고, 되었다면 해당 쿠폰이 체크된 경우 활성화
  useEffect(() => {
    if (!isOver2CouponsChecked || (isOver2CouponsChecked && isCouponChecked)) {
      setIsDisabled(false);
    }
    if (isOver2CouponsChecked && !isCouponChecked) {
      setIsDisabled(true);
    }
  }, [isOver2CouponsChecked, isCouponChecked]);

  // 최소 주문금액이 넘었을 경우 체크 활성화
  useEffect(() => {
    if (coupon?.minimumAmount && coupon.minimumAmount >= totalAmount) {
      setIsDisabled(false);
    }
    if (coupon?.minimumAmount && coupon?.minimumAmount < totalAmount) {
      setIsDisabled(true);
    }
  }, [coupon?.minimumAmount, totalAmount]);

  //TODO: buyXgetY 확인
  //TODO: 유효기간 확인

  return { isDisabled };
};

export default useCoupon;
