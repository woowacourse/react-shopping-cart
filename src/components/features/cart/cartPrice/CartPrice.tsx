import Separator from '../../../common/separator/Separator';
import { CART_RULE } from '../constants/cartRule';
import * as S from './CartPrice.styles';

interface CartPriceProps {
  value: number;
}

function CartPrice({ value }: CartPriceProps) {
  const deliveryFee =
    value >= CART_RULE.FREE_DELIVERY_THRESHOLD
      ? 0
      : CART_RULE.DEFAULT_DELIVERY_FEE;
  const totalPrice = value + deliveryFee;
  return (
    <S.Container>
      <S.Description>
        <img src="./assets/Notification.svg" alt="알림" />
        <S.DescriptionText>
          총 주문 금액이 {CART_RULE.FREE_DELIVERY_THRESHOLD.toLocaleString()}원
          이상일 경우 무료 배송됩니다.
        </S.DescriptionText>
      </S.Description>
      <Separator />
      <S.IndividualPriceBox>
        <S.PriceRow data-testid="price-row">
          <S.PriceLabel>주문 금액</S.PriceLabel>
          <S.PriceAmount>{value.toLocaleString()}원</S.PriceAmount>
        </S.PriceRow>
        <S.PriceRow data-testid="price-row">
          <S.PriceLabel>배송비</S.PriceLabel>
          <S.PriceAmount>{deliveryFee.toLocaleString()}원</S.PriceAmount>
        </S.PriceRow>
      </S.IndividualPriceBox>
      <Separator />
      <S.PriceRow data-testid="price-row">
        <S.PriceLabel>총 결제 금액</S.PriceLabel>
        <S.PriceAmount>{totalPrice.toLocaleString()}원</S.PriceAmount>
      </S.PriceRow>
    </S.Container>
  );
}

export default CartPrice;
