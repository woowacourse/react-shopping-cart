import * as S from "./PriceSection.styles";
import Line from "../../../common/Line";

const PriceSection = () => {
  return (
    <S.Container>
      <S.Description>
        ※ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </S.Description>
      <Line />

      <S.PriceInfo>
        <S.Label>주문 금액</S.Label>
        <S.Price>7,000원</S.Price>
      </S.PriceInfo>

      <S.PriceInfo>
        <S.Label>배송비</S.Label>
        <S.Price>3,000원</S.Price>
      </S.PriceInfo>
      <Line />

      <S.PriceInfo>
        <S.Label>총 결제 금액</S.Label>
        <S.Price>10,000원</S.Price>
      </S.PriceInfo>
    </S.Container>
  );
};

export default PriceSection;
