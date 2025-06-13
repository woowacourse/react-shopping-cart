import InfoText from "@/shared/components/InfoText/InfoText";
import * as S from "./PriceContainer.styled";
import { FREE_DELIVERY_LIMIT } from "@/domains/constants/delivery";

type Price = {
  title: string;
  price: number;
};

type PriceContainerProps = {
  priceList: Price[];
  paymentPrice: number;
};

export default function PriceContainer({
  priceList,
  paymentPrice,
}: PriceContainerProps) {
  return (
    <S.Container>
      <InfoText>
        총 주문 금액이 {FREE_DELIVERY_LIMIT.toLocaleString()}원 이상일 경우 무료
        배송됩니다.
      </InfoText>
      <S.PriceBox>
        {priceList.map(({ title, price }) => (
          <S.PriceTextBox key={title}>
            <S.PriceTitle>{title}</S.PriceTitle>
            <S.PriceText data-testid={`${title}-price`}>
              {price.toLocaleString()}원
            </S.PriceText>
          </S.PriceTextBox>
        ))}
      </S.PriceBox>
      <S.TotalPriceBox>
        <S.PaymentTextBox>
          <S.PriceTitle>총 결제 금액</S.PriceTitle>
          <S.PriceText data-testid="payment-price">
            {paymentPrice.toLocaleString()}원
          </S.PriceText>
        </S.PaymentTextBox>
      </S.TotalPriceBox>
    </S.Container>
  );
}
