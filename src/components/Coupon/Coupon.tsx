import { CouponType } from "../../types/response";
import { getAvailableTimeDescription } from "./utils";

interface CouponProps {
  coupon: CouponType;
}

function Coupon({ coupon }: CouponProps) {
  return (
    <div>
      <p>{coupon.description}</p>
      <p>
        만료일:
        {`${coupon.expirationDate.year}년 ${coupon.expirationDate.month}월 ${coupon.expirationDate.day}일`}
      </p>
      {"minimumAmount" in coupon && (
        <p>최소 주문 금액: {coupon.minimumAmount.toLocaleString()}</p>
      )}
      {"availableTime" in coupon && (
        <p>
          사용 가능 시간: {getAvailableTimeDescription(coupon.availableTime)}
        </p>
      )}
    </div>
  );
}

export default Coupon;
