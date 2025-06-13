import * as S from "./PaymentPrice.styled";

type PaymentPriceProps = {
  paymentPrice: number;
};

export default function PaymentPrice({ paymentPrice }: PaymentPriceProps) {
  return (
    <S.PriceContainer>
      <S.PriceTitle>총 결제 금액</S.PriceTitle>
      <S.PriceText>{paymentPrice.toLocaleString()}원</S.PriceText>
    </S.PriceContainer>
  );
}
