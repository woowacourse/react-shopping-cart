import * as S from "./OrderResult.styled";

function OrderResult() {
  return (
    <S.OrderResultWrapper>
      <S.OrderResultTitle>주문 확인</S.OrderResultTitle>
      <S.OrderResultDescription>
        총 2종류의 상품 4개를 주문합니다.
      </S.OrderResultDescription>
      <S.OrderResultDescription>
        최종 결제 금액을 확인해 주세요.
      </S.OrderResultDescription>
      <S.OrderResultPriceTitle>총 결제 금액</S.OrderResultPriceTitle>
      <S.OrderResultPrice>120,000원</S.OrderResultPrice>
    </S.OrderResultWrapper>
  );
}

export default OrderResult;
