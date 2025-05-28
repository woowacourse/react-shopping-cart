import * as S from './OrderPriceSummary.styles';
export default function OrderPriceSummary() {
  return (
    <S.OrderPriceSummaryContainer>
      <S.DeliveryFeeLabel>
        <S.DeliveryFeeIcon src='./infoLabelIcon.svg' alt='Delivery Fee Label Icon' />총 주문 금액이 100,000원 이상일
        경우 무료 배송됩니다.
      </S.DeliveryFeeLabel>
      <S.TotalOrderPrice>
        주문 금액
        <S.PriceBox>70,000원</S.PriceBox>
      </S.TotalOrderPrice>
      <S.DeliveryFee>
        배송비
        <S.PriceBox>3,000원</S.PriceBox>
      </S.DeliveryFee>
      <S.TotalPurchasePrice>
        총 결제 금액
        <S.PriceBox>73,000원</S.PriceBox>
      </S.TotalPurchasePrice>
    </S.OrderPriceSummaryContainer>
  );
}
