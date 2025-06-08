import { CouponContent } from '@/api/type';
import styled from '@emotion/styled';
import { useMemo } from 'react';
import { Flex, Header } from '../../components/common';
import BackArrowButton from '../../components/common/BackArrowButton';
import ErrorBoundary from '../../components/features/error-boundary/ErrorBoundary';
import { useOrderListContext } from '../shopping-cart/context/OrderListProvider';
import { useModal } from './hooks/useModal';
import { useNavigation } from './hooks/useNavigation';
import { useOrderCoupons } from './hooks/useOrderCoupons';
import { useOrderInfo } from './hooks/useOrderInfo';
import { useShipping } from './hooks/useShipping';
import CouponModal from './order-coupon/CouponModal';
import CouponModalOpenButton from './order-coupon/CouponModalOpenButton';
import LabelCouponPrice from './order-coupon/LabelCouponPrice';
import OrderItemList from './order-coupon/OrderItemList';
import DeliveryRegionSection from './order-delivery/DeliveryRegionSection';
import OrderPageInfo from './OrderPageInfo';
import { getDiscountByCouponId } from './utils/getDiscountByCouponId';

const OrderReviewPage = () => {
  const { typeCount, totalCount, isDisabled } = useOrderInfo();

  const {
    isJejuOrRemoteArea,
    actualShippingFee,
    handleJejuOrRemoteAreaToggle,
  } = useShipping();

  const {
    coupons,
    isLoading,
    availableCoupons,
    selectedCouponIds,
    // bestCouponIds,

    // 핸들러
    handleSelectCoupons,
  } = useOrderCoupons(isJejuOrRemoteArea);

  const { selectedItems, orderPrice } = useOrderListContext();
  const currentDiscount = useMemo(() => {
    const selectedCoupons = selectedCouponIds
      .map((id) => availableCoupons.find((c) => c.id === id))
      .filter(Boolean) as CouponContent[];

    return selectedCoupons.reduce((total, coupon) => {
      return (
        total +
        getDiscountByCouponId(
          coupon,
          orderPrice,
          selectedItems,
          isJejuOrRemoteArea
        )
      );
    }, 0);
  }, [
    selectedCouponIds,
    availableCoupons,
    orderPrice,
    selectedItems,
    isJejuOrRemoteArea,
  ]);

  const payment = orderPrice + actualShippingFee - currentDiscount;

  const { showCouponModal, handleShowCouponModal } = useModal();
  const { handleBackClick, handleCheckout } = useNavigation(
    isDisabled,
    payment
  );

  return (
    <ErrorBoundary>
      <Header left={<BackArrowButton onClick={handleBackClick} />} />
      <Container>
        <OrderPageInfo typeCount={typeCount} totalCount={totalCount} />
        <OrderItemList />
        <CouponModalOpenButton handleClick={handleShowCouponModal}>
          쿠폰 적용
        </CouponModalOpenButton>
        <DeliveryRegionSection
          checked={isJejuOrRemoteArea}
          onToggle={handleJejuOrRemoteAreaToggle}
        />
        <LabelCouponPrice
          totalDiscount={currentDiscount}
          actualShippingFee={actualShippingFee}
          payment={payment}
        />
        <CouponModal
          show={showCouponModal}
          onHide={handleShowCouponModal}
          coupons={coupons ?? []}
          isLoading={isLoading}
          availableCoupons={availableCoupons}
          // selectedCouponIds={selectedCouponIds}
          totalDiscount={currentDiscount}
          handleApply={handleSelectCoupons}
          isJejuOrRemoteArea={isJejuOrRemoteArea}
        />
      </Container>
      <CheckoutButton
        $isDisabled={isDisabled}
        disabled={isDisabled}
        onClick={handleCheckout}
        aria-label='결제하기'
      >
        결제하기
      </CheckoutButton>
    </ErrorBoundary>
  );
};

export default OrderReviewPage;

const Container = styled(Flex)`
  padding: 0 24px;
  height: calc(100vh - 116px);
  align-items: flex-start;
`;

const CheckoutButton = styled.button<{ $isDisabled: boolean }>`
  width: 100%;
  padding: 16px;
  background-color: ${({ $isDisabled }) => ($isDisabled ? '#BDBDBD' : '#333')};
  color: white;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  border-radius: 0px;
`;
