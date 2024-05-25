import useRemoteArea from "@/hooks/useRemoteArea";

import CheckBox from "@/components/_common/CheckBox/CheckBox";
import Caption from "@/components/_common/Caption/Caption";

import Styled from "../OrderConfirmPage.styles";

const ShippingInfoCheckBox = () => {
  const { isRemoteArea, toggleRemoteArea } = useRemoteArea();

  return (
    <Styled.ShippingInfoWrapper>
      <Styled.ShippingInfoText>배송 정보</Styled.ShippingInfoText>
      <Styled.ShippingCheckboxWrapper>
        <CheckBox isChecked={isRemoteArea} onClick={toggleRemoteArea} />
        <Caption text="제주도 및 도서 산간 지역" />
      </Styled.ShippingCheckboxWrapper>
    </Styled.ShippingInfoWrapper>
  );
};

export default ShippingInfoCheckBox;
