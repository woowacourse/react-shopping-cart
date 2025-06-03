import { getDeliveryPrice } from "@/pages/cart/utils/getDeliveryPrice";
import * as S from "./PriceContainer.styled";
import InfoIcon from "@assets/icons/info.svg";
import { FREE_DELIVERY_LIMIT } from "@/pages/cart/constants/delivery";

type PriceContainerProps = {
  orderTotalPrice: number;
};

export default function PriceContainer({
  orderTotalPrice,
}: PriceContainerProps) {
  const deliveryPrice = getDeliveryPrice(orderTotalPrice);
  const paymentPrice = orderTotalPrice + deliveryPrice;

  return (
    <S.Container>
      <S.InfoContainer>
        <S.InfoIcon src={InfoIcon} alt="배송비 무료 안내" />
        <S.InfoText>
          총 주문 금액이 {FREE_DELIVERY_LIMIT.toLocaleString()}원 이상일 경우
          무료 배송됩니다.
        </S.InfoText>
      </S.InfoContainer>
      <S.PriceBox>
        <S.PriceTextBox>
          <S.PriceTitle>주문 금액</S.PriceTitle>
          <S.PriceText data-testid="order-price">
            {orderTotalPrice.toLocaleString()}원
          </S.PriceText>
        </S.PriceTextBox>
        <S.PriceTextBox>
          <S.PriceTitle>배송비</S.PriceTitle>
          <S.PriceText data-testid="delivery-price">
            {deliveryPrice.toLocaleString()}원
          </S.PriceText>
        </S.PriceTextBox>
      </S.PriceBox>
      <S.TotalPriceBox>
        <S.PriceTextBox>
          <S.PriceTitle>총 결제 금액</S.PriceTitle>
          <S.PriceText data-testid="payment-price">
            {paymentPrice.toLocaleString()}원
          </S.PriceText>
        </S.PriceTextBox>
      </S.TotalPriceBox>
    </S.Container>
  );
}
