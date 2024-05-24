import { useRecoilValue } from 'recoil';
import NotificationLabel from '../../common/NotificationLabel/NotificationLabel';
import PriceContainer from '../PriceContainer/PriceContainer';
import { totalOrderPriceSelector, deliveryFeeSelector } from '../../../recoil/CartItem/selectors/selectors';
import { totalDiscountPriceState } from '../../../recoil/Coupon/selectors/selectors';
import { DELIVERY_FEE_DISCOUNT_THRESHOLD } from '../../../utils/calculateDeliveryFee';
import * as S from './TotalPriceContainer.style';

interface TotalPriceContainerProps {
  isConfirm?: boolean;
}

function TotalPriceContainer({ isConfirm = false }: TotalPriceContainerProps) {
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceState);
  const deliveryFee = useRecoilValue(deliveryFeeSelector);

  const totalPaymentPrice = totalOrderPrice + deliveryFee - totalDiscountPrice;

  return (
    <S.Layout>
      <NotificationLabel
        text={`총 주문 금액이 ${DELIVERY_FEE_DISCOUNT_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
      />
      <S.PriceDetailContainer>
        <PriceContainer title="주문 금액" value={totalOrderPrice} />
        {isConfirm && (
          <PriceContainer title="쿠폰 할인 금액" value={totalDiscountPrice === 0 ? 0 : -totalDiscountPrice} />
        )}
        <PriceContainer title="배송비" value={deliveryFee} />
      </S.PriceDetailContainer>
      <PriceContainer title="총 결제 금액" value={totalPaymentPrice} />
    </S.Layout>
  );
}

export default TotalPriceContainer;
