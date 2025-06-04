import * as S from "./OrderPriceSection.styled";

function OrderPriceSection({
  orderPrice,
  deliveryPrice,
}: {
  orderPrice: number;
  deliveryPrice: number;
}) {
  return (
    <div>
      <S.PriceWrapper>
        <S.OrderText>주문 금액</S.OrderText>
        <S.OrderPrice>{orderPrice.toLocaleString("kr")}원</S.OrderPrice>
      </S.PriceWrapper>
      <S.PriceWrapper>
        <S.OrderText>배송비</S.OrderText>
        <S.OrderPrice>{deliveryPrice.toLocaleString("kr")}원</S.OrderPrice>
      </S.PriceWrapper>
      <S.Line />
      <S.PriceWrapper>
        <S.OrderText>총 결제 금액</S.OrderText>
        <S.OrderPrice>
          {(orderPrice + deliveryPrice).toLocaleString("kr")}원
        </S.OrderPrice>
      </S.PriceWrapper>
    </div>
  );
}

export default OrderPriceSection;
