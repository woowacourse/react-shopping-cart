import InfoIconSrc from '../../assets/infoIcon.png';
import * as S from './style';
import * as C from '../common/commonStyles';
import { priceFormatter } from '../../utils/stringFormatter';

interface CheckoutSummaryProps {
  totalPrice: number;
  shippingFee: number;
  coupon?: number;
}

export default function CheckoutSummary({
  totalPrice,
  shippingFee,
  coupon,
}: CheckoutSummaryProps) {
  return (
    <S.Container>
      <C.Info>
        <C.InfoIcon src={InfoIconSrc} alt="Info Icon" />총 주문 금액이 100,000원
        이상일 경우 무료 배송됩니다.
      </C.Info>

      <S.Divider />

      <S.PriceRowContainer>
        <S.PriceRow>
          <S.Label>주문 금액</S.Label>
          <C.Price>{priceFormatter(totalPrice)}</C.Price>
        </S.PriceRow>

        {(coupon || coupon === 0) && (
          <S.PriceRow>
            <S.Label>쿠폰 할인 금액</S.Label>
            <C.Price>-{priceFormatter(coupon)}</C.Price>
          </S.PriceRow>
        )}

        <S.PriceRow>
          <S.Label>배송비</S.Label>
          <C.Price>{priceFormatter(shippingFee)}</C.Price>
        </S.PriceRow>
      </S.PriceRowContainer>

      <S.Divider />

      <S.PriceRow>
        <S.Label>총 결제 금액</S.Label>
        <C.Price>
          {priceFormatter(totalPrice + shippingFee - (coupon ?? 0))}
        </C.Price>
      </S.PriceRow>
    </S.Container>
  );
}
