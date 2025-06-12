import { useState } from 'react';
import { usePageNavigation } from '@app/hooks/usePageNavigation';
import * as S from './OrderContent.styled';
import OrderList from '@features/order/ui/OrderList';
import CommonButton from '@shared/ui/CommonButton';
import RemoteArea from '@features/order/ui/RemoteArea';
import BottomConfirmButton from '@shared/ui/BottomConfirmButton/BottomConfirmButton';
import PriceContainer from '../PriceContainer';
import { CartItemType, calculateDeliveryFee, calculateOrderPrice } from '@entities/cart';
import CouponModal from '@widget/order/CouponModal';
import {
  useClientCoupon,
  calculateCouponDiscountTotalPrice,
  ClientCouponType,
} from '@entities/coupon';
import { useModal } from '@shared/ui/Modal/hook/useModal';

interface OrderContentProps {
  orderItems: CartItemType[];
}

export default function OrderContent({ orderItems }: OrderContentProps) {
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const { clientCoupons, updateClientCoupons } = useClientCoupon({
    orderItems,
    isRemoteArea,
    onError: (message) => {
      alert(message);
    },
  });
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const { navigateToPayment } = usePageNavigation();

  const orderItemsType = orderItems.length;
  const orderTotalQuantity = orderItems.reduce((acc, { quantity }) => (acc += quantity), 0);

  const orderPrice = calculateOrderPrice(orderItems);
  const couponDiscountPrice = calculateCouponDiscountTotalPrice(clientCoupons);
  const deliveryFee = calculateDeliveryFee(orderPrice) + (isRemoteArea ? 3000 : 0);
  const orderTotalPrice = orderPrice + deliveryFee - couponDiscountPrice;

  const handleRemoteAreaClick = () => {
    setIsRemoteArea(!isRemoteArea);
  };

  const handlePaymentButtonClick = () => {
    navigateToPayment({ orderItems, orderTotalPrice });
  };

  const handleCouponConfirm = (selectedCoupons: ClientCouponType[]) => {
    updateClientCoupons(selectedCoupons);
  };

  return (
    <S.Container>
      <S.Text>
        총 {orderItemsType}종류의 상품 {orderTotalQuantity}개를 주문합니다.
        <br />
        최종 결제 금액을 확인해주세요.
      </S.Text>
      <OrderList orderItems={orderItems} />
      <CommonButton colorType="white" buttonText="쿠폰 적용" onClick={handleModalOpen} />
      <CouponModal
        isOpen={isOpen}
        onClose={handleModalClose}
        clientCoupons={clientCoupons}
        onConfirm={handleCouponConfirm}
      />
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
