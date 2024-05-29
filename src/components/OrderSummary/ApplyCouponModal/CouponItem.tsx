import styled from "styled-components";
import { Coupon, isFixedDiscountCoupon } from "../../../types/coupons";

interface CouponItemProps {
  coupon: Coupon;
  isCheckableCouponsYet: boolean;
  onChange: () => void;
}

const getCondition = (coupon: Coupon) => {
  if (isFixedDiscountCoupon(coupon)) {
    return `최소 주문 금액: ${coupon.minimumAmount?.toLocaleString()}원`;
  }
};

export default function CouponItem({
  coupon,
  isCheckableCouponsYet,
  onChange,
}: CouponItemProps) {
  const checkable =
    coupon.isValidCoupon &&
    coupon.isApplicableCoupon &&
    (isCheckableCouponsYet || coupon.isSelected);

  return (
    <S.Container>
      <S.CheckboxWrapper>
        <S.Checkbox
          type="checkbox"
          checked={coupon.isSelected}
          disabled={!checkable}
          id={`coupon-selection-${coupon.id}`}
          onChange={onChange}
        />
        <S.CheckboxLabel htmlFor={`coupon-selection-${coupon.id}`}>
          {coupon.description}
        </S.CheckboxLabel>
      </S.CheckboxWrapper>
      <S.DetailInfo>
        <S.ExpirationDate>만료일: {coupon.expirationDate}</S.ExpirationDate>
        <S.Condition>{getCondition(coupon)}</S.Condition>
      </S.DetailInfo>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: 1px solid #d9d9d9;
    padding-top: 12px;
  `,

  CheckboxWrapper: styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    gap: 8px;
  `,

  Checkbox: styled.input`
    accent-color: black;
    margin: 0;
    width: 20px;
    height: 20px;
  `,

  CheckboxLabel: styled.label`
    font-weight: 700;
    size: 16px;
  `,

  DetailInfo: styled.div``,

  ExpirationDate: styled.div``,

  Condition: styled.div``,
};
