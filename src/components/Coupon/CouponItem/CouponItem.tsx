import * as Styled from "./CouponItem.style";
import CheckBox from "@/components/common/CheckBox";

import { Coupon } from "@/type/Coupon";

interface CouponItemProps {
  coupon: Coupon;
  onSelect: (couponId: string) => void;
  isSelected: boolean;
  isLimitReached: boolean;
}

function CouponItem({
  coupon,
  onSelect,
  isSelected,
  isLimitReached,
}: CouponItemProps) {
  const { code, expirationDate, description } = coupon;
  const startDate = new Date();
  const endDate = new Date();
  let period = "";
  if (coupon.availableTime) {
    const startHour = Number(coupon.availableTime.start.split(":")[0]);
    const endHour = Number(coupon.availableTime.end.split(":")[0]);
    startDate.setHours(startHour, 0, 0, 0);
    endDate.setHours(endHour, 0, 0, 0);
    period = startDate.getHours() < 12 ? "오전" : "오후";
  }

  return (
    <Styled.Container disabled={isLimitReached && !isSelected}>
      <Styled.CouponHeaderWrapper>
        <CheckBox
          id={`select-checkbox-coupon-${code}`}
          checked={isSelected}
          onChange={() => onSelect(code)}
          label={`${code} 쿠폰 선택`}
          boxSize="medium"
          hidden={true}
          disabled={isLimitReached && !isSelected}
        />
        <Styled.CouponDescription>{description}</Styled.CouponDescription>
      </Styled.CouponHeaderWrapper>
      <Styled.CouponDetails>
        {expirationDate && (
          <span>
            만료일: {new Date(expirationDate).toLocaleDateString("ko-KR")}
          </span>
        )}
        {coupon?.minimumAmount && (
          <span>최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원</span>
        )}
        {coupon?.availableTime && (
          <span>
            사용 가능 시간: {period} {startDate.getHours()}시부터 ~{" "}
            {endDate.getHours()}시까지
          </span>
        )}
      </Styled.CouponDetails>
    </Styled.Container>
  );
}

export default CouponItem;
