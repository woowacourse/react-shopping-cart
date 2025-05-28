import Footer from "../../components/layout/Footer/Footer";
import * as S from "./OrderCheckPage.styles";

export default function OrderCheckPage() {
  return (
    <>
      <S.Container>
        <S.Title>주문 확인</S.Title>
        <S.Description>
          <p>총 2종류의 상품 4개를 주문합니다.</p>
          <p>최종 결제 금액을 확인해 주세요.</p>
        </S.Description>
        <S.PriceInfo>총 결제 금액</S.PriceInfo>
        <S.TotalPrice>120,000원</S.TotalPrice>
      </S.Container>
      <Footer text="결제하기" active="false" />
    </>
  );
}
