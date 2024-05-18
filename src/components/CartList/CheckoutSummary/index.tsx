import InfoIconSrc from "../../../assets/infoIcon.png";
import formatPriceToKoreanWon from "../../../util/formatPriceToKoreanWon";
import {
  Container,
  Divider,
  Info,
  InfoIcon,
  Label,
  Price,
  PriceRow,
  PriceRowContainer,
} from "./style";

interface CheckoutSummaryProps {
  totalPrice: number;
  shippingFee: number;
}

export default function CheckoutSummary({
  totalPrice,
  shippingFee,
}: CheckoutSummaryProps) {
  return (
    <Container>
      <Info>
        <InfoIcon src={InfoIconSrc} alt="Info Icon" />총 주문 금액이 100,000원
        이상일 경우 무료 배송됩니다.
      </Info>

      <Divider />

      <PriceRowContainer>
        <PriceRow>
          <Label>주문 금액</Label>
          <Price>{formatPriceToKoreanWon(totalPrice)}</Price>
        </PriceRow>
        <PriceRow>
          <Label>배송비</Label>
          <Price>{formatPriceToKoreanWon(shippingFee)}</Price>
        </PriceRow>
      </PriceRowContainer>

      <Divider />

      <PriceRow>
        <Label>총 결제 금액</Label>
        <Price>{formatPriceToKoreanWon(totalPrice + shippingFee)}</Price>
      </PriceRow>
    </Container>
  );
}
