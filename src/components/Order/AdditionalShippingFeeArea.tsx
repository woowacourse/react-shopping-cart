import { FlexColumn, FlexRow } from "@/style/common.style";

import CheckBox from "../common/CheckBox";
import styled from "@emotion/styled";
import useAdditionalShippingFeeArea from "@/hooks/useAdditionalShippingFeeArea";

const AdditionalShippingFeeArea = () => {
  const { isSelected, handleSelect } = useAdditionalShippingFeeArea();

  return (
    <StyledWrapper>
      <StyledTitle>배송 정보</StyledTitle>
      <StyledCheckBoxWrapper>
        <CheckBox
          id="AdditionalShippingFeeArea"
          isSelected={isSelected}
          onClick={handleSelect}
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
