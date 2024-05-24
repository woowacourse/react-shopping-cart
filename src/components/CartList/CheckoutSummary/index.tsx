import { useRecoilValue } from "recoil";
import InfoIconSrc from "../../../assets/infoIcon.png";
import { FREE_SHIPPING_THRESHOLD } from "../../../constants";
import { useCoupons } from "../../../hooks/coupons";
import {
  cartListTotalPrice,
  shippingFeeSelector,
} from "../../../recoil/selectors";
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

export default function CheckoutSummary() {
  const totalPrice = useRecoilValue(cartListTotalPrice);
  const { totalDiscountAmount } = useCoupons();
  const shippingFee = useRecoilValue(shippingFeeSelector);

  return (
    <Container>
      <Info>
        <InfoIcon src={InfoIconSrc} alt="Info Icon" />
        {`총 주문 금액이 ${formatPriceToKoreanWon(FREE_SHIPPING_THRESHOLD)} 이상일 경우 무료 배송됩니다.`}
      </Info>

      <Divider />

      <PriceRowContainer>
        <PriceRow>
          <Label>주문 금액</Label>
          <Price>{formatPriceToKoreanWon(totalPrice)}</Price>
        </PriceRow>
        <PriceRow>
          <Label>쿠폰 할인 금액</Label>
          <Price>
            {totalDiscountAmount > 0 && "-"}
            {formatPriceToKoreanWon(totalDiscountAmount)}
          </Price>
        </PriceRow>
        <PriceRow>
          <Label>배송비</Label>
          <Price>{formatPriceToKoreanWon(shippingFee)}</Price>
        </PriceRow>
      </PriceRowContainer>

      <Divider />

      <PriceRow>
        <Label>총 결제 금액</Label>
        <Price>
          {formatPriceToKoreanWon(
            totalPrice + shippingFee - totalDiscountAmount
          )}
        </Price>
      </PriceRow>
    </Container>
  );
}
