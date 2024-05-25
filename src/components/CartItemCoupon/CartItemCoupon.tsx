import { useEffect } from "react";

import useCouponAvailability from "@/hooks/useCouponAvailability";

import CheckBox from "../_common/CheckBox/CheckBox";
import Caption from "../_common/Caption/Caption";

import { parseAvailableTime, parseDate } from "@/utils/parser";
import { Coupon } from "@/types/cart";

import Styled from "./CartItemCoupon.style";

interface CouponProps {
  coupon: Coupon;
  checkSelectedCoupon: (id: number) => boolean;
  handleAddCoupon: (coupon: Coupon) => void;
  handleRemoveCoupon: (coupon: Coupon) => void;
}

const CartItemCoupon = ({
  coupon,
  checkSelectedCoupon,
  handleAddCoupon,
  handleRemoveCoupon,
}: CouponProps) => {
  const { checkCouponUsable } = useCouponAvailability(coupon.id);
  const isSelectedCoupon = checkSelectedCoupon(coupon.id);

  const isCouponUsable = checkCouponUsable();

  useEffect(() => {
    if (isSelectedCoupon && !isCouponUsable) {
      handleRemoveCoupon(coupon);
    }
  }, [coupon, isSelectedCoupon, isCouponUsable, handleRemoveCoupon]);

  return (
    <>
      <Styled.CouponSeparator />
      <Styled.CouponInfoWrapper isCouponUsable={isCouponUsable}>
        <Styled.CouponHeader>
          <CheckBox
            disabled={!isCouponUsable}
            isChecked={isSelectedCoupon}
            onClick={
              !isSelectedCoupon
                ? () => handleAddCoupon(coupon)
                : () => handleRemoveCoupon(coupon)
            }
          />
          <Styled.CouponText>{coupon.description}</Styled.CouponText>
        </Styled.CouponHeader>

        <Styled.CouponBody>
          <Caption text={parseDate(coupon.expirationDate)} />
          {coupon.minimumAmount && (
            <Caption
              text={`최소 주문 금액 : ${coupon.minimumAmount.toLocaleString()}원`}
            />
          )}
          {coupon.availableTime && (
            <Caption
              text={`사용 가능 시간 : ${parseAvailableTime(
                coupon.availableTime
              )}`}
            />
          )}
        </Styled.CouponBody>
      </Styled.CouponInfoWrapper>
    </>
  );
};

export default CartItemCoupon;
