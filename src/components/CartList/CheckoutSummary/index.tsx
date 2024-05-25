import InfoIconSrc from '../../../assets/infoIcon.png';
import * as S from './style';
import * as C from '../../commonStyles';

interface CheckoutSummaryProps {
  totalPrice: number;
  shippingFee: number;
}

export default function CheckoutSummary({
  totalPrice,
  shippingFee,
}: CheckoutSummaryProps) {
  return (
    <S.Container>
      <S.Info>
        <S.InfoIcon src={InfoIconSrc} alt="Info Icon" />총 주문 금액이 100,000원
        이상일 경우 무료 배송됩니다.
      </S.Info>

      <S.Divider />

      <S.PriceRowContainer>
        <S.PriceRow>
          <S.Label>주문 금액</S.Label>
          <C.Price>{totalPrice.toLocaleString()}원</C.Price>
        </S.PriceRow>
        <S.PriceRow>
          <S.Label>배송비</S.Label>
          <C.Price>{shippingFee.toLocaleString()}원</C.Price>
        </S.PriceRow>
      </S.PriceRowContainer>

      <S.Divider />

      <S.PriceRow>
        <S.Label>총 결제 금액</S.Label>
        <C.Price>{(totalPrice + shippingFee).toLocaleString()}원</C.Price>
      </S.PriceRow>
    </S.Container>
  );
}
