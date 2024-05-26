import styled from "styled-components";
import CouponView from "./CouponView";
import { Coupon } from "../../../types/coupon";

export interface CouponListProps {
  coupons: Coupon[];
  toggleCouponSelection: (couponId: number) => void;
  hasReachedCouponMaxCount: boolean;
}

export default function CouponList({
  coupons,
  toggleCouponSelection,
  hasReachedCouponMaxCount,
}: CouponListProps) {
  return (
    <S.CouponList>
      {coupons.map((coupon) => (
        <CouponView
          key={coupon.id}
          coupon={coupon}
          toggleSelection={() => toggleCouponSelection(coupon.id)}
          hasReachedCouponMaxCount={hasReachedCouponMaxCount}
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
