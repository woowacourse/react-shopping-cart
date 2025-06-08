import CheckBox from "../CheckBox/CheckBox";
import { Container, Title } from "./ExtraShipping.styles";

interface ExtraShippingProps {
  isSelected: boolean;
  toggleSelect: () => void;
}

function ExtraShipping({ isSelected, toggleSelect }: ExtraShippingProps) {
  return (
    <section css={Container}>
      <h3 css={Title}>배송 정보</h3>
      <CheckBox
        id="extra-shipping"
        label="제주도 및 도서 산간 지역"
        isSelected={isSelected}
        onClick={toggleSelect}
      />
    </section>
  );
}

export default ExtraShipping;
