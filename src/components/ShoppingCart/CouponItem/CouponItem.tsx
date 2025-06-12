import * as Styled from "./CouponItem.styles";
import * as CartListStyled from "../CartList/CartList.styles";

import Hr from "../../common/Hr/Hr";

import { isCouponValid } from "../../../utils/isCouponValid";
import { formatAvailableTime } from "../../../utils/formatAvailableTime";

import { formatDate } from "../../../utils/formatDate";

import { Coupon } from "../../../types/Coupon";

export default function CouponItem({
  coupon,
  orderAmount,
  selectedCoupons,
  handleCheckboxChange,
}: {
  coupon: Coupon;
  orderAmount: number;
  selectedCoupons: Map<number, boolean>;
  handleCheckboxChange: (couponId: number) => void;
}) {
  const unavailableCoupon = !isCouponValid(coupon, orderAmount);
  const disabled =
    unavailableCoupon ||
    (!selectedCoupons.get(coupon.id) && selectedCoupons.size >= 2);

  return (
    <Styled.CouponContainer key={coupon.id}>
      <Hr />
      <CartListStyled.Checkbox>
        <CartListStyled.Input
          type="checkbox"
          id={`coupon-${coupon.id}`}
          checked={!!selectedCoupons.get(coupon.id)}
          disabled={disabled}
          onChange={() => handleCheckboxChange(coupon.id)}
        />
        <label htmlFor={`coupon-${coupon.id}`}>{coupon.description}</label>
      </CartListStyled.Checkbox>
      <Styled.CouponDescribe>
        <p>만료일: {formatDate(coupon.expirationDate)}</p>
        {"minimumAmount" in coupon && (
          <p>최소 주문 금액: {coupon.minimumAmount}</p>
        )}
        {"availableTime" in coupon && (
          <p>
            사용 가능 시간:{" "}
            {formatAvailableTime(
              coupon.availableTime.start,
              coupon.availableTime.end
            )}
          </p>
        )}
        {unavailableCoupon && (
          <Styled.disabledText>
            사용 불가: 기간이 지났거나 시간 조건에 맞지 않아요.
          </Styled.disabledText>
        )}
      </Styled.CouponDescribe>
    </Styled.CouponContainer>
  );
}
