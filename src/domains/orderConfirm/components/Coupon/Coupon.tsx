import React from "react";
import { CheckBox } from "../../../../components/CheckBox/CheckBox";
import { InfoText } from "../../../../components/InfoText/InfoText";
import { CouponType } from "../../types/coupon";
import { formatToKoreanAmPm } from "../../utils/getDateInfo";
import { checkBoxLayout, couponLayout, infoTextLayout } from "./Coupon.style";

interface CouponProps {
  item: CouponType;
  isSelected: boolean;
  handleCouponSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

export function Coupon({
  item,
  isSelected,
  handleCouponSelect,
  isDisabled = false,
}: CouponProps) {
  return (
    <div css={couponLayout(isDisabled)} id={item.code}>
      <div css={checkBoxLayout}>
        <CheckBox
          checked={isSelected}
          dataTestId={`${item.code}`}
          id={`${item.code}`}
          onChange={handleCouponSelect}
          disabled={isDisabled}
        />
        <p>{item.description}</p>
      </div>
      <div css={infoTextLayout}>
        <InfoText>
          만료일: {new Date(item.expirationDate).toLocaleDateString()}
        </InfoText>
        {item.minimumAmount && (
          <InfoText>최소 주문 금액 : {item.minimumAmount} </InfoText>
        )}
        {item.availableTime && (
          <InfoText>
            사용 가능 시간 : {formatToKoreanAmPm(item.availableTime?.start)}
            부터 {formatToKoreanAmPm(item.availableTime?.end)}까지
          </InfoText>
        )}
      </div>
    </div>
  );
}
