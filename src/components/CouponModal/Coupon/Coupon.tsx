import { PropsWithChildren } from "react";

import Divider from "@/components/Divider/Divider";
import ToolBar from "@/components/ToolBar/ToolBar";
import useCoupon from "@/hooks/useCoupon";
import { couponContainerStyle, couponDescriptionStyle, strongTextStyle } from "./Coupon.style";
import CouponAvailableTime from "./CouponAvailableTime";

interface CouponProps extends PropsWithChildren {
  couponInfo: Coupon;
}

const Coupon = ({ couponInfo }: CouponProps) => {
  const { disabled, isChecked, handleCheckClick } = useCoupon(couponInfo.id);
  const [year, month, day] = couponInfo.expirationDate.split("-");

  return (
    <div css={couponContainerStyle}>
      <Divider />
      <ToolBar handleCheck={handleCheckClick} isCheck={isChecked} disabled={disabled}>
        <div css={strongTextStyle}>{couponInfo.description}</div>
      </ToolBar>
      <div css={couponDescriptionStyle}>
        <div>
          만료일 : {year}년 {month}월 {day}일
        </div>
        {couponInfo.minimumAmount && <div>최소 주문 금액 : {couponInfo.minimumAmount.toLocaleString()}원</div>}
        {couponInfo.availableTime && <CouponAvailableTime availableTime={couponInfo.availableTime} />}
      </div>
    </div>
  );
};

export default Coupon;
