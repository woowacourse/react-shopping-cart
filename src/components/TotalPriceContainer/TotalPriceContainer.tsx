import { useRecoilValue } from 'recoil';
import { selectedCartItemListTotalPriceSelector } from '../../recoil/selectors/selectors';
import { DELIVERY_FEE_DISCOUNT_THRESHOLD, calculateDeliveryFee } from '../../utils/calculateDeliveryFee';
import { InfoIcon } from '../../assets';
import * as S from './TotalPriceContainer.style';

function TotalPriceContainer() {
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);

  const deliveryFee = calculateDeliveryFee(selectedCartItemTotalPrice);
  const totalPrice = selectedCartItemTotalPrice + deliveryFee;

  return (
    <S.Layout>
      <S.NotificationContainer>
        <S.InfoIcon src={InfoIcon} />
        <p>총 주문 금액이 {DELIVERY_FEE_DISCOUNT_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.</p>
      </S.NotificationContainer>
      <S.PriceDetailContainer>
        <S.PriceContainer>
          <S.PriceTitle>주문 금액</S.PriceTitle>
          <S.PriceValue>{selectedCartItemTotalPrice.toLocaleString()}원</S.PriceValue>
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
