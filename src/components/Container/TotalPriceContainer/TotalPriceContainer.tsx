import { useRecoilValue } from 'recoil';
import NotificationContainer from '../NotificationContainer/NotificationContainer';
import PriceContainer from '../PriceContainer/PriceContainer';
import { selectedCartItemListTotalPriceSelector } from '../../../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import * as S from './TotalPriceContainer.style';
import { useCalculateDeliveryFee } from '../../../hooks/useCalculateDeliveryFee';
import { DELIVERY_FEE_DISCOUNT_THRESHOLD } from '../../../constants/DELIVERY_INFOS';
import { selectedCouponListState } from '../../../recoil/Coupon/atoms/selectedCouponListState';

function TotalPriceContainer() {
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
  const { deliveryFee, calculateDeliveryFee } = useCalculateDeliveryFee();
  const selectedCouponList = useRecoilValue(selectedCouponListState);
  calculateDeliveryFee();

  const totalPrice = selectedCartItemTotalPrice + deliveryFee;

  return (
    <S.Layout>
      <NotificationContainer
        content={`총 주문 금액이 ${DELIVERY_FEE_DISCOUNT_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
      />
      <S.PriceDetailContainer>
        <PriceContainer title="주문 금액" value={selectedCartItemTotalPrice} />
        {selectedCouponList.length !== 0 && <PriceContainer title="쿠폰 할인 금액" value={-5000} />}
        <PriceContainer title="배송비" value={deliveryFee} />
      </S.PriceDetailContainer>
      <PriceContainer title="총 결제 금액" value={totalPrice} />
    </S.Layout>
  );
}

export default TotalPriceContainer;
