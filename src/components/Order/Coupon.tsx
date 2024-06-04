import { FlexColumn, FlexRow } from "@/style/common.style";

import { COUPON_MESSAGE } from "@/constants/message";
import CheckBox from "../common/CheckBox";
import { CouponType } from "@/types/coupon.type";
import styled from "@emotion/styled";
import useCoupon from "@/hooks/useCoupon";

interface Props {
  coupon: CouponType;
  selectedCoupons: CouponType[];
  setSelectedCoupons: React.Dispatch<React.SetStateAction<CouponType[]>>;
}

const Coupon = ({ coupon, selectedCoupons, setSelectedCoupons }: Props) => {
  const { isSelected, disabled, handleSelect } = useCoupon({
    coupon,
    selectedCoupons,
    setSelectedCoupons,
  });

  return (
    <StyledItemWrapper disabled={disabled}>
      <StyledCheckBoxWrapper>
        <CheckBox
          id={`coupon-${coupon.id}`}
          isSelected={isSelected}
          onClick={disabled ? () => {} : handleSelect}
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
