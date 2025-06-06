import { useCoupon } from '@/hooks/useCoupon';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Header } from '../../components/common';
import BackArrowButton from '../../components/common/BackArrowButton';
import ErrorBoundary from '../../components/features/error-boundary/ErrorBoundary';
import { useOrderListContext } from '../shopping-cart/context/OrderListProvider';
import CouponModal from './order-coupon/CouponModal';
import CouponModalOpenButton from './order-coupon/CouponModalOpenButton';
import LabelCouponPrice from './order-coupon/LabelCouponPrice';
import OrderItemList from './order-coupon/OrderItemList';
import DeliveryRegionSection from './order-delivery/DeliveryRegionSection';
import OrderPageInfo from './OrderPageInfo';

const OrderReviewPage = () => {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const navigate = useNavigate();
  const { cartListData, selectionMap } = useOrderListContext();
  const isDisabled = !Object.values(selectionMap).some(
    (isSelected) => isSelected
  );
  const { coupons, isLoading, fetchCoupons } = useCoupon();
  useEffect(() => {
    fetchCoupons();
  }, []);

  if (!coupons) return;
  console.log(coupons);
  const orderList = (cartListData ?? []).filter(
    (cart) => selectionMap[cart.id] === true
  );
  const typeCount = orderList.length;
  const totalCount = orderList.reduce((acc, cart) => acc + cart.quantity, 0);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    if (!isDisabled) {
      navigate('/order-confirm');
    }
  };

  const handleShowCouponModal = () => {
    setShowCouponModal((prev) => !prev);
  };

  return (
    <ErrorBoundary>
      <Header left={<BackArrowButton onClick={handleBackClick} />} />
      <Container>
        <OrderPageInfo typeCount={typeCount} totalCount={totalCount} />
        <OrderItemList />
        <CouponModalOpenButton handleClick={handleShowCouponModal}>
          쿠폰 적용
        </CouponModalOpenButton>
        <DeliveryRegionSection checked={false} onToggle={() => {}} />
        <LabelCouponPrice />
        <CouponModal
          show={showCouponModal}
          onHide={handleShowCouponModal}
          coupons={coupons}
          isLoading={isLoading}
        />
      </Container>
      <CheckoutButton
        $isDisabled={isDisabled}
        disabled={isDisabled}
        onClick={handleCheckout}
        aria-label='주문 확인'
      >
        주문 확인
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
