import useCouponAvailability from "@/hooks/useCouponAvailability";

import CheckBox from "../_common/CheckBox/CheckBox";
import Caption from "../_common/Caption/Caption";

import { parseAvailableTime, parseDate } from "@/utils/parser";
import { Coupon } from "@/types/cart";

import Styled from "./CartItemCoupon.style";

interface CouponProps {
  coupon: Coupon;
  checkSelectedCoupon: (id: number) => boolean;
  handleAddTemporaryCoupon: (coupon: Coupon) => void;
  handleRemoveTemporaryCoupon: (coupon: Coupon) => void;
}

const CartItemCoupon = ({
  coupon,
  checkSelectedCoupon,
  handleAddTemporaryCoupon,
  handleRemoveTemporaryCoupon,
}: CouponProps) => {
  const { checkCouponUsable } = useCouponAvailability(coupon.id);
  const isSelectedCoupon = checkSelectedCoupon(coupon.id);

  const couponValidationMessage = checkCouponUsable();
  const isCouponUsable = couponValidationMessage === "";

  return (
    <>
      <Styled.CouponSeparator />
      <Styled.CouponInfoWrapper $isCouponUsable={isCouponUsable}>
        <Styled.CouponHeader>
          <CheckBox
            disabled={!isCouponUsable}
            isChecked={isSelectedCoupon}
            onClick={() => {
              !isSelectedCoupon
                ? handleAddTemporaryCoupon(coupon)
                : handleRemoveTemporaryCoupon(coupon);
            }}
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

      {couponValidationMessage && (
        <Caption text={couponValidationMessage} theme="warning" />
      )}
    </>
  );
};

export default CartItemCoupon;
