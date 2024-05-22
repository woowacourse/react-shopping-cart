import { CheckboxButton } from "../button";
import {
  StyledCheckShippingRegionCondition,
  StyledCheckShippingRegionDescription,
  StyledShippingRegionInfoContainer,
  StyledShippingRegionInfoTitle,
} from "./ShippingRegionInfo.styled";

export const ShippingRegionInfo: React.FC = () => {
  const isChecked = true;
  const onCheck = () => {};

  return (
    <StyledShippingRegionInfoContainer>
      <StyledShippingRegionInfoTitle>배송 정보</StyledShippingRegionInfoTitle>
      <StyledCheckShippingRegionCondition>
        <CheckboxButton isChecked={isChecked} onCheck={onCheck} />
        <StyledCheckShippingRegionDescription>
          제주도 및 도서 산간 지역
        </StyledCheckShippingRegionDescription>
      </StyledCheckShippingRegionCondition>
    </StyledShippingRegionInfoContainer>
  );
};
