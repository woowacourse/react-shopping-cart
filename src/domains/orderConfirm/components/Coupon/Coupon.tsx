import { CouponType } from "../../types/coupon";

interface CouponProps {
  item: CouponType;
}

export function Coupon({ item }: CouponProps) {
  return (
    <div>
      <p>{item.description}</p>
      <p>만료일: {new Date(item.expirationDate).toLocaleDateString()}</p>
      <p>최소 주문 금액 : {item.minimumAmount}</p>
      <p>
        사용 가능 시간 : {item.availableTime?.start} 부터{" "}
        {item.availableTime?.end}까지
      </p>
    </div>
  );
}
