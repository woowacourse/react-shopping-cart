import { FlexColumn, FlexRow } from "@/style/common.style";
import {
  additionalShippingFeeAreaState,
  discountAmountState,
  selectedCouponsState,
} from "@/store/atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import { ADDITIONAL_SHIPPING_FEE } from "@/constants/system";
import CheckBox from "../common/CheckBox";
import styled from "@emotion/styled";

const AdditionalShippingFeeArea = () => {
  const [isSelected, setSelected] = useRecoilState(
    additionalShippingFeeAreaState
  );

  const [discountAmount, setDiscountAmount] =
    useRecoilState(discountAmountState);
  const selectedCoupons = useRecoilValue(selectedCouponsState);

  const handleClick = () => {
    setSelected(!isSelected);

    if (
      !selectedCoupons.some((coupon) => coupon.discountType === "freeShipping")
    ) {
      return;
    }

    if (!isSelected) {
      setDiscountAmount(discountAmount + ADDITIONAL_SHIPPING_FEE);
    } else {
      setDiscountAmount(discountAmount - ADDITIONAL_SHIPPING_FEE);
    }
  };

  return (
    <StyledWrapper>
      <StyledTitle>배송 정보</StyledTitle>
      <StyledCheckBoxWrapper>
        <CheckBox
          id="AdditionalShippingFeeArea"
          isSelected={isSelected}
          onClick={handleClick}
        />
        <StyledCaption>{"제주도 및 도서 산간 지역"}</StyledCaption>
      </StyledCheckBoxWrapper>
    </StyledWrapper>
  );
};

export default AdditionalShippingFeeArea;

const StyledWrapper = styled.div`
  ${FlexColumn}
  gap: 12px;
  padding-bottom: 12px;
`;

const StyledCheckBoxWrapper = styled.div`
  ${FlexRow}
  gap: 8px;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;
`;

const StyledCaption = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
