import Separator from '../../../common/separator/Separator';
import * as S from './CartPrice.styles';

interface CartPriceProps {
  orderPrice: number;
}

function CartPrice({ orderPrice }: CartPriceProps) {
  const deliveryFee = orderPrice >= 100_000 ? 0 : 3_000;
  const totalPrice = orderPrice + deliveryFee;
  return (
    <S.Container>
      <S.Description>
        <img src="./assets/Notification.svg" />
        <S.DescriptionText>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </S.DescriptionText>
      </S.Description>
      <Separator />
      <S.IndividualPriceBox>
        <S.PriceRow data-testid="price-row">
          <S.PriceLabel>주문 금액</S.PriceLabel>
          <S.PriceAmount>{orderPrice.toLocaleString()}원</S.PriceAmount>
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
