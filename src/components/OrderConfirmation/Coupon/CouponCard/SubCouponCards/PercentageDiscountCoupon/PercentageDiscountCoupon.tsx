import * as Styled from "./PercentageDiscountCoupon.style";
import type { PercentageDiscountCoupon as PercentageDiscountCouponType } from "../../../../../../type/Coupons";
import { getTimes } from "../../../../../../util/coupons/PercentageDiscountCoupon/getTimes";

interface PercentageDiscountCouponProps {
  coupon: PercentageDiscountCouponType;
}

const checkDayAndNight = (hour: number) => {
  if (hour >= 0 && hour < 12) {
    return "오전";
  } else if (hour >= 12 && hour < 24) {
    return "오후";
  }
};

function PercentageDiscountCoupon({ coupon }: PercentageDiscountCouponProps) {
  const {
    availableTime: { start, end },
  } = coupon;

  const { hour: startHour } = getTimes(start);
  const { hour: endHour } = getTimes(end);

  return (
    <Styled.Text>
      사용 가능 시간: {checkDayAndNight(Number(startHour))} {startHour}시부터{" "}
      {endHour}시까지
    </Styled.Text>
  );
}

export default PercentageDiscountCoupon;
