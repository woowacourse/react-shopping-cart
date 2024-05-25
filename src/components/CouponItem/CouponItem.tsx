/** @jsxImportSource @emotion/react */
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
  isCheck: boolean;
  isDisabled: boolean;
  onSelect: (coupon: Coupon) => void;
}

const CouponItem = ({ couponInfo, isCheck, isDisabled, onSelect }: CouponItemProps) => {
  const handleClickCheckbox = () => {
    if (!isDisabled) {
      onSelect(couponInfo);
    }
  };

  return (
    <div css={CouponItemContainerStyle}>
      <Divider />
      <div css={CouponItemCheckboxContainerStyle}>
        <Checkbox isCheck={isCheck} isDisabled={isDisabled} onClick={handleClickCheckbox} />
        <div css={CouponItemCheckboxTitleStyle(isDisabled)}>{couponInfo.description}</div>
      </div>
      <div css={CouponItemInfoContainerStyle(isDisabled)}>
        <div>{"만료일: " + couponInfo.expirationDate}</div>
        {couponInfo.minimumAmount && <div>{"최소 주문 금액: " + couponInfo.minimumAmount.toLocaleString() + "원"}</div>}
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
