import { useRecoilValue } from 'recoil';
import PriceContainer from '../PriceContainer/PriceContainer';
import { cartOrderTotalPriceSelector, deliveryFeeSelector } from '../../../recoil/selectors/selectors';
import { DELIVERY_FEE_DISCOUNT_THRESHOLD } from '../../../utils/calculateDeliveryFee';
import { InfoIcon } from '../../../assets';
import * as S from './TotalPriceContainer.style';

interface TotalPriceContainerProps {
  isConfirm?: boolean;
}

function TotalPriceContainer({ isConfirm = false }: TotalPriceContainerProps) {
  const orderTotalPrice = useRecoilValue(cartOrderTotalPriceSelector);
  const deliveryFee = useRecoilValue(deliveryFeeSelector);

  const paymentTotalPrice = orderTotalPrice + deliveryFee;

  return (
    <S.Layout>
      <S.NotificationContainer>
        <S.InfoIcon src={InfoIcon} />
        <p>총 주문 금액이 {DELIVERY_FEE_DISCOUNT_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.</p>
      </S.NotificationContainer>
      <S.PriceDetailContainer>
        <PriceContainer title="주문 금액" value={orderTotalPrice} />
        {isConfirm && <PriceContainer title="쿠폰 할인 금액" value={0} />}
        <PriceContainer title="배송비" value={deliveryFee} />
      </S.PriceDetailContainer>
      <PriceContainer title="총 결제 금액" value={paymentTotalPrice} />
    </S.Layout>
  );
}

export default TotalPriceContainer;
