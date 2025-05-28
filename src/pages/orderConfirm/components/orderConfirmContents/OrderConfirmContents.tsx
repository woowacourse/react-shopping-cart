import * as S from './OrderConfirmContents.styles';
function OrderConfirmContents() {
  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.Description>
        총 2종류의 상품 4개를 주문합니다.
        <br />
        최종 결제 금액을 확인해 주세요.
      </S.Description>
      <S.PriceBox>
        <S.PriceText>총 결제 금액</S.PriceText>
        <S.Price>120,000원</S.Price>
      </S.PriceBox>
    </S.Container>
  );
}

export default OrderConfirmContents;
