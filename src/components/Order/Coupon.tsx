import { FlexColumn, FlexRow } from "@/style/common.style";

import { COUPON_MESSAGE } from "@/constants/message";
import CheckBox from "../common/CheckBox";
import { CouponType } from "@/types/coupon.type";
import { MAX_APPLICABLE_COUPON } from "@/constants/system";
import { cartSummaryState } from "@/store/selectors/summarySelector/cartSummarySelector";
import { curKoreaTime } from "@/utils/date";
import { isValidExpirationDate } from "@/utils/isValidExpirationDate";
import { selectedItemsState } from "@/store/selectors/selectedSelector/selectedItemsSelector";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { useState } from "react";

interface Props {
  coupon: CouponType;
  selectedCoupons: CouponType[];
  setSelectedCoupons: React.Dispatch<React.SetStateAction<CouponType[]>>;
}

const Coupon = ({ coupon, selectedCoupons, setSelectedCoupons }: Props) => {
  const [isSelected, setSelected] = useState(selectedCoupons.includes(coupon));
  const { orderPrice } = useRecoilValue(cartSummaryState);
  const selectedItems = useRecoilValue(selectedItemsState);

  const handleClick = () => {
    setSelected(!isSelected);

    if (!isSelected && !selectedCoupons.includes(coupon)) {
      const newList = [...selectedCoupons, coupon];
      setSelectedCoupons(newList);
      return;
    }

    const filteredList = selectedCoupons.filter(
      (selectedCoupon) => coupon.id !== selectedCoupon.id
    );

    setSelectedCoupons(filteredList);
  };

  const checkDisabled = () => {
    //유효기간 확인
    if (!isValidExpirationDate(coupon.expirationDate)) {
      return true;
    }
    // 사용 가능 시간 확인
    if (coupon.availableTime) {
      const startTime = Number(coupon.availableTime.start.slice(0, 2));
      const endTime = Number(coupon.availableTime.end.slice(0, 2));
      const curTime = curKoreaTime.getHours();

      if (curTime < startTime || curTime >= endTime) {
        return true;
      }
    }

    //최소 주문 금액 확인
    if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) {
      return true;
    }

    // BOGO 쿠폰 최소 수량 확인
    if (selectedItems.every((item) => item.quantity < 3)) {
      return true;
    }

    // coupon 최대 적용 갯수 확인
    if (
      selectedCoupons.length >= MAX_APPLICABLE_COUPON &&
      !selectedCoupons.includes(coupon)
    ) {
      return true;
    }

    return false;
  };

  const disabled = checkDisabled();

  return (
    <StyledItemWrapper disabled={disabled}>
      <StyledCheckBoxWrapper>
        <CheckBox
          id={`coupon-${coupon.id}`}
          isSelected={isSelected}
          onClick={disabled ? () => {} : handleClick}
          disabled={disabled}
        />
        <StyledBoldText>{coupon.description}</StyledBoldText>
      </StyledCheckBoxWrapper>
      <StyledCaptionText>
        만료일: {COUPON_MESSAGE.expirationDate(coupon.expirationDate)}
      </StyledCaptionText>
      {coupon.minimumAmount && (
        <StyledCaptionText>
          최소 주문 금액: {COUPON_MESSAGE.minimumAmount(coupon.minimumAmount)}
        </StyledCaptionText>
      )}
      {coupon.availableTime && (
        <StyledCaptionText>
          사용 가능 시간:
          {COUPON_MESSAGE.availableTime(coupon.availableTime)}
        </StyledCaptionText>
      )}
    </StyledItemWrapper>
  );
};

export default Coupon;

const StyledItemWrapper = styled.div<{ disabled: boolean }>`
  ${FlexColumn}
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  border-top: 1px solid #bebebe;
  padding: 10px 0;
  gap: 4px;

  color: ${(props) => (props.disabled ? "#bebebe" : "#000000")};
`;

const StyledCheckBoxWrapper = styled.div`
  ${FlexRow}
  gap: 8px;
  align-items: center;
`;

const StyledBoldText = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const StyledCaptionText = styled.span`
  font-size: 14px;
  margin: 0;
`;
