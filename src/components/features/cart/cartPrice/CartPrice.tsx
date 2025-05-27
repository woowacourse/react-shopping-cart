import Separator from '../../../common/separator/Separator';
import * as S from './CartPrice.styles';

function CartPrice() {
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
        <S.PriceRow>
          <S.PriceLabel>주문 금액</S.PriceLabel>
          <S.PriceAmount>70,000원</S.PriceAmount>
        </S.PriceRow>
        <S.PriceRow>
          <S.PriceLabel>배송비</S.PriceLabel>
          <S.PriceAmount>3,000원</S.PriceAmount>
        </S.PriceRow>
      </S.IndividualPriceBox>
      <Separator />
      <S.PriceRow>
        <S.PriceLabel>총 결제 금액</S.PriceLabel>
        <S.PriceAmount>73,000원</S.PriceAmount>
      </S.PriceRow>
    </S.Container>
  );
}

export default CartPrice;
