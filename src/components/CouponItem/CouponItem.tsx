/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { getCouponAvailableTimeString } from "../../store/utils";
import Checkbox from "../common/Buttons/Checkbox/Checkbox";
import Divider from "../common/Divider/Divider";
import {
  CouponItemCheckboxContainerStyle,
  CouponItemCheckboxTitleStyle,
  CouponItemContainerStyle,
  CouponItemInfoContainerStyle,
} from "./CouponItem.style";

interface CouponItemProps {
  couponInfo: Coupon;
}

const CouponItem = ({ couponInfo }: CouponItemProps) => {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleClickCheckbox = () => {
    setIsCheck((prev) => !prev);
  };

  return (
    <div css={CouponItemContainerStyle}>
      <Divider />
      <div css={CouponItemCheckboxContainerStyle}>
        <Checkbox isCheck={isCheck} onClick={() => handleClickCheckbox()} />
        <div css={CouponItemCheckboxTitleStyle}>{couponInfo.description}</div>
      </div>
      <div css={CouponItemInfoContainerStyle}>
        <div>{"만료일: " + couponInfo.expirationDate}</div>
        {couponInfo.minimumAmount && <div>{"최소 주문 금액: " + couponInfo.minimumAmount}</div>}
        {couponInfo.availableTime && (
          <div>
            {"사용 가능 시간: " +
              getCouponAvailableTimeString(couponInfo.availableTime.start, couponInfo.availableTime.end)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponItem;
