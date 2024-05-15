import { useRecoilValue } from 'recoil';
import { InfoIcon } from '../../assets';
import { cartItemTotalPriceState } from '../../recoil/selectors/selectors';
import * as S from './TotalPriceContainer.style';

function TotalPriceContainer() {
  const cartItemTotalPrice = useRecoilValue(cartItemTotalPriceState);

  const deliveryFee = cartItemTotalPrice === 0 || cartItemTotalPrice >= 100000 ? 0 : 3000;
  const totalPrice = cartItemTotalPrice + deliveryFee;

  return (
    <S.Layout>
      <S.NotificationContainer>
        <S.InfoIcon src={InfoIcon} />
        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </S.NotificationContainer>
      <S.PriceDetailContainer>
        <S.PriceContainer>
          <S.PriceTitle>주문 금액</S.PriceTitle>
          <S.PriceValue>{cartItemTotalPrice.toLocaleString()}원</S.PriceValue>
        </S.PriceContainer>
        <S.PriceContainer>
          <S.PriceTitle>배송비</S.PriceTitle>
          <S.PriceValue>{deliveryFee.toLocaleString()}원</S.PriceValue>
        </S.PriceContainer>
      </S.PriceDetailContainer>
      <S.PriceContainer>
        <S.PriceTitle>총 결제 금액</S.PriceTitle>
        <S.PriceValue>{totalPrice.toLocaleString()}원</S.PriceValue>
      </S.PriceContainer>
    </S.Layout>
  );
}

export default TotalPriceContainer;
