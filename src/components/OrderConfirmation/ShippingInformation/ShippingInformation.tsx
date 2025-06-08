import CheckBox from "../../common/CheckBox/CheckBox";
import * as Styled from "./ShippingInformation.style";

interface ShippingInformationProps {
  isRemoteAreaShipping: boolean;
  handleToggle: () => void;
}

function ShippingInformation({
  isRemoteAreaShipping,
  handleToggle,
}: ShippingInformationProps) {
  return (
    <>
      <Styled.Title>배송 정보</Styled.Title>
      <Styled.Wrapper>
        <CheckBox
          onClick={handleToggle}
          isChecked={isRemoteAreaShipping}
          isDisabled={false}
        />
        <Styled.Text>제주도 및 도서 산간 지역</Styled.Text>
      </Styled.Wrapper>
    </>
  );
}

export default ShippingInformation;
