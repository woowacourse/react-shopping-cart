import { useRecoilValue } from 'recoil';
import NotificationContainer from '../../NotificationContainer/NotificationContainer';
import PriceContainer from '../PriceContainer/PriceContainer';
import { selectedCartItemListTotalPriceSelector } from '../../../pages/ShoppingCartPage/recoil/selector/selectedCartItemListTotalPriceSelector';
import { DELIVERY_FEE_DISCOUNT_THRESHOLD, calculateDeliveryFee } from '../../../utils/calculateDeliveryFee';
import * as S from './TotalPriceContainer.style';

function TotalPriceContainer() {
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);

  const deliveryFee = calculateDeliveryFee(selectedCartItemTotalPrice);
  const totalPrice = selectedCartItemTotalPrice + deliveryFee;

  return (
    <S.Layout>
      <NotificationContainer
        content={`총 주문 금액이 ${DELIVERY_FEE_DISCOUNT_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
      />
      <S.PriceDetailContainer>
        <PriceContainer title="주문 금액" value={selectedCartItemTotalPrice} />
        <PriceContainer title="배송비" value={deliveryFee} />
      </S.PriceDetailContainer>
      <PriceContainer title="총 결제 금액" value={totalPrice} />
    </S.Layout>
  );
}

export default TotalPriceContainer;
