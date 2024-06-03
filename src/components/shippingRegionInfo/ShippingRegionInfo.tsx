import { useRecoilState } from "recoil";
import { isShippingRegionCheckedState } from "../../recoil/atoms/atoms";
import { CheckboxButton } from "../button";
import {
  StyledCheckShippingRegionCondition,
  StyledCheckShippingRegionDescription,
  StyledShippingRegionInfoContainer,
  StyledShippingRegionInfoTitle,
} from "./ShippingRegionInfo.styled";

export const ShippingRegionInfo: React.FC = () => {
  const [isChecked, setIsChecked] = useRecoilState(isShippingRegionCheckedState);

  const onChangeShippingRegionCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <StyledShippingRegionInfoContainer>
      <StyledShippingRegionInfoTitle>배송 정보</StyledShippingRegionInfoTitle>
      <StyledCheckShippingRegionCondition>
        <CheckboxButton isChecked={isChecked} onCheck={onChangeShippingRegionCheck} />
        <StyledCheckShippingRegionDescription>
          제주도 및 도서 산간 지역
        </StyledCheckShippingRegionDescription>
      </StyledCheckShippingRegionCondition>
    </StyledShippingRegionInfoContainer>
  );
};
