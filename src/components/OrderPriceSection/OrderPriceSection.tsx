import * as S from "./OrderPriceSection.styled";

interface OrderPriceSectionProps {
  priceInfo: {
    orderPrice: number;
    deliveryPrice: number;
    couponDiscount: number;
    totalPrice: number;
  };
}

function OrderPriceSection({ priceInfo }: OrderPriceSectionProps) {
  const { orderPrice, deliveryPrice, couponDiscount, totalPrice } = priceInfo;

  return (
    <div>
      <S.PriceWrapper>
        <S.OrderText>주문 금액</S.OrderText>
        <S.OrderPrice>{orderPrice.toLocaleString("kr")}원</S.OrderPrice>
      </S.PriceWrapper>

      {couponDiscount > 0 && (
        <S.PriceWrapper>
          <S.OrderText>쿠폰 할인 금액</S.OrderText>
          <S.OrderPrice>{couponDiscount.toLocaleString("kr")}원</S.OrderPrice>
        </S.PriceWrapper>
      )}

      <S.PriceWrapper>
        <S.OrderText>배송비</S.OrderText>
        <S.OrderPrice>{deliveryPrice.toLocaleString("kr")}원</S.OrderPrice>
      </S.PriceWrapper>

      <S.Line />

      <S.PriceWrapper>
        <S.OrderText>총 결제 금액</S.OrderText>
        <S.OrderPrice>{totalPrice.toLocaleString("kr")}원</S.OrderPrice>
      </S.PriceWrapper>
    </div>
  );
}

export default OrderPriceSection;
