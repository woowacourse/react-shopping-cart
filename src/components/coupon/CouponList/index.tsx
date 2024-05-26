import { useRecoilValue } from "recoil";
import { couponsState } from "@/stores/coupons";

import useCouponSelections from "@/hooks/coupons/useCouponSelections";
import { CheckButton } from "@/components/button";

import { Coupon } from "@/types/coupon";

import * as S from "./styled";

const CouponList = () => {
  const coupons = useRecoilValue(couponsState);
  const { isCouponSelectable, toggleCoupon, isCouponSelected } =
    useCouponSelections();

  const handleToggleCoupon = (coupon: Coupon) => {
    if (isCouponSelectable(coupon)) {
      toggleCoupon(coupon);
    }
  };

  return (
    <S.CouponWrapper>
      {coupons.map((coupon) => (
        <S.CouponContent
          key={coupon.id}
          $isCouponSelectable={isCouponSelectable(coupon)}
        >
          <S.CouponHeader>
            <CheckButton
              isChecked={isCouponSelected(coupon.id)}
              onToggle={() => handleToggleCoupon(coupon)}
            />
            <div>{coupon.description}</div>
          </S.CouponHeader>
          <S.CouponBody>
            {coupon.expirationDate && (
              <div>만료일: {coupon.expirationDate}</div>
            )}
            {coupon.minimumAmount && (
              <div>최소 주문 금액: {coupon.minimumAmount}</div>
            )}
            {coupon.availableTime && (
              <div>
                사용 가능 시간: 오전{coupon.availableTime.start}부터
                {coupon.availableTime.end}까지
              </div>
            )}
          </S.CouponBody>
        </S.CouponContent>
      ))}
    </S.CouponWrapper>
  );
};

export default CouponList;
