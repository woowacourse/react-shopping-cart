import * as S from "./OrderPriceSection.styled";
import { calculateDeliveryPrice } from "../../utils/price";
function OrderPriceSection({
  orderPrice,
  couponPrice,
  isDeliveryFree,
  isRemoteArea,
}: {
  orderPrice: number;
  couponPrice?: number;
  isDeliveryFree: boolean;
  isRemoteArea: boolean;
}) {
  const calculatedDeliveryPrice = calculateDeliveryPrice(
    orderPrice,
    isRemoteArea
  );

  const calculatedTotalPrice =
    orderPrice + calculatedDeliveryPrice - (couponPrice ?? 0);

  return (
    <div>
      <S.PriceWrapper>
        <S.OrderText>주문 금액</S.OrderText>
        <S.OrderPrice>{orderPrice.toLocaleString("kr")}원</S.OrderPrice>
      </S.PriceWrapper>
      {couponPrice !== undefined && couponPrice !== 0 && (
        <S.PriceWrapper>
          <S.OrderText>쿠폰 할인 금액</S.OrderText>
          <S.OrderPrice>{couponPrice.toLocaleString("kr")}원</S.OrderPrice>
        </S.PriceWrapper>
      )}

      <S.PriceWrapper>
        <S.OrderText>배송비</S.OrderText>
        <S.OrderPrice>
          {isDeliveryFree ? 0 : calculatedDeliveryPrice.toLocaleString("kr")}원
        </S.OrderPrice>
      </S.PriceWrapper>
      <S.Line />
      <S.PriceWrapper>
        <S.OrderText>총 결제 금액</S.OrderText>
        <S.OrderPrice>
          {calculatedTotalPrice.toLocaleString("kr")}원
        </S.OrderPrice>
      </S.PriceWrapper>
    </div>
  );
}

export default OrderPriceSection;
