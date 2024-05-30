import useShippingArea from "@/hooks/carts/useShippingArea";
import { CheckButton } from "@/components/button";
import * as S from "./styled";

const ShippingAreaSelection = () => {
  const { shippingArea, changeShippingArea } = useShippingArea();

  return (
    <S.Container>
      <S.Title>배송 정보</S.Title>
      <S.ContentWrapper>
        <CheckButton
          isChecked={shippingArea === "remote"}
          onToggle={changeShippingArea}
        />
        <div>제주도 및 도서 산간 지역</div>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default ShippingAreaSelection;
