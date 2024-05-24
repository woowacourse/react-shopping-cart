import { useRecoilValue } from 'recoil';

import { DELIVERY_FEE_DISCOUNT_THRESHOLD } from '../../../constants/DELIVERY_INFOS';
import { useCalculateDeliveryFee } from '../../../hooks/useCalculateDeliveryFee';
import { useCalculateTotalCouponDiscount } from '../../../hooks/useCalculateTotalCouponDiscount';
import { selectedCartItemListTotalPriceSelector } from '../../../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import NotificationContainer from '../NotificationContainer/NotificationContainer';
import PriceContainer from '../PriceContainer/PriceContainer';
import * as S from './TotalPriceContainer.style';

interface TotalPriceContainerProps {
  isOrderConfirmPage?: boolean;
}

function TotalPriceContainer({ isOrderConfirmPage = false }: TotalPriceContainerProps) {
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
  const { deliveryFee, calculateDeliveryFee } = useCalculateDeliveryFee();
  const { selectedCouponTotalDiscount, calculateTotalCouponDiscount } = useCalculateTotalCouponDiscount();
  calculateDeliveryFee();
  calculateTotalCouponDiscount();

  const totalPrice = selectedCartItemTotalPrice + deliveryFee - selectedCouponTotalDiscount;

  return (
    <S.Layout>
      <NotificationContainer
        content={`총 주문 금액이 ${DELIVERY_FEE_DISCOUNT_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
      />
      <S.PriceDetailContainer>
        <PriceContainer title="주문 금액" value={selectedCartItemTotalPrice} />
        {isOrderConfirmPage && selectedCouponTotalDiscount !== 0 && (
          <PriceContainer title="쿠폰 할인 금액" value={-selectedCouponTotalDiscount} />
        )}
        <PriceContainer title="배송비" value={deliveryFee} />
      </S.PriceDetailContainer>
      <PriceContainer title="총 결제 금액" value={totalPrice} />
    </S.Layout>
  );
}

export default TotalPriceContainer;
