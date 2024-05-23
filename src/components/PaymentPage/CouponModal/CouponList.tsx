import styled from "styled-components";

import CouponView from "./CouponView";

import { MAX_SELECTABLE_COUPON_COUNT } from "../../../hooks/useCoupons/ruleConstants";
import { Coupon } from "../../../types/coupon";

export interface CouponListProps {
  coupons: Coupon[];
  toggleCouponSelection: (couponId: number) => void;
}

export default function CouponList({ coupons, toggleCouponSelection }: CouponListProps) {
  const isMaxCouponsSelected =
    coupons.filter(({ isSelected }) => isSelected).length >= MAX_SELECTABLE_COUPON_COUNT;

  return (
    <S.CouponList>
      {coupons.map((coupon) => (
        <CouponView
          key={coupon.id}
          coupon={coupon}
          toggleSelection={() => toggleCouponSelection(coupon.id)}
          hasReachedMaxCount={isMaxCouponsSelected}
        />
      ))}
    </S.CouponList>
  );
}

const S = {
  CouponList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
};
