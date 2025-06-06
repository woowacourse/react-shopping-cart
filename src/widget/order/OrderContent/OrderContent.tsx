import { useState } from 'react';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import * as S from './OrderContent.styled';
import OrderList from '@features/order/ui/OrderList';
import CommonButton from '@shared/components/CommonButton';
import RemoteArea from '@features/order/ui/RemoteArea';
import BottomConfirmButton from '@shared/components/BottomConfirmButton/BottomConfirmButton';
import PriceContainer from '../PriceContainer';
import {
  calculateDeliveryFee,
  calculateOrderPrice,
} from '@features/cart/utils/cartPriceCalculator';
import { CartItemType } from '@entities/cart';

interface OrderContentProps {
  orderItems: CartItemType[];
}

export default function OrderContent({ orderItems }: OrderContentProps) {
  const [isRemoteArea, setIsRemoteArea] = useState(false);
  const { navigateToPayment } = usePageNavigation();

  const orderItemsType = orderItems.length;
  const orderTotalQuantity = orderItems.reduce((acc, { quantity }) => (acc += quantity), 0);

  const orderPrice = calculateOrderPrice(orderItems);
  const couponDiscountPrice = -6000;
  const deliveryFee = calculateDeliveryFee(orderPrice) + (isRemoteArea ? 3000 : 0);
  const orderTotalPrice = orderPrice + deliveryFee + couponDiscountPrice;

  const handleOrderConfirmButtonClick = () => {
    console.log('handleOrderConfirmButtonClick');
  };

  const handleRemoteAreaClick = () => {
    setIsRemoteArea(!isRemoteArea);
  };

  const handlePaymentButtonClick = () => {
    navigateToPayment({ orderItems, orderTotalPrice });
  };

  return (
    <S.Container>
      <S.Text>
        총 {orderItemsType}종류의 상품 {orderTotalQuantity}개를 주문합니다.
        <br />
        최종 결제 금액을 확인해주세요.
      </S.Text>
      <S.ScrollContainer>
        <OrderList orderItems={orderItems} />
      </S.ScrollContainer>
      <CommonButton buttonText="쿠폰 적용" onClick={handleOrderConfirmButtonClick} />
      <RemoteArea isChecked={isRemoteArea} onClick={handleRemoteAreaClick} />
      <PriceContainer
        orderPrice={orderPrice}
        couponDiscountPrice={couponDiscountPrice}
        deliveryFee={deliveryFee}
        orderTotalPrice={orderTotalPrice}
      />
      <BottomConfirmButton
        buttonText="결제하기"
        disabled={false}
        onClick={handlePaymentButtonClick}
      />
    </S.Container>
  );
}
