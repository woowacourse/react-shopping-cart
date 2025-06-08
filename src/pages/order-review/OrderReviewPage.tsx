import { CouponContent } from '@/api/type';
import { useCoupon } from '@/hooks/useCoupon';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Flex, Header } from '../../components/common';
import BackArrowButton from '../../components/common/BackArrowButton';
import ErrorBoundary from '../../components/features/error-boundary/ErrorBoundary';
import { getCouponCombinations } from './hooks/getCouponCombinations';
import { useAvailableCoupons } from './hooks/useAvailableCoupons';
import { useBestCouponCombination } from './hooks/useBestCouponCombination';
import { useModal } from './hooks/useModal';
import { useNavigation } from './hooks/useNavigation';
import { useOrderInfo } from './hooks/useOrderInfo';
import { useShipping } from './hooks/useShipping';
import CouponModal from './order-coupon/CouponModal';
import CouponModalOpenButton from './order-coupon/CouponModalOpenButton';
import LabelCouponPrice from './order-coupon/LabelCouponPrice';
import OrderItemList from './order-coupon/OrderItemList';
import DeliveryRegionSection from './order-delivery/DeliveryRegionSection';
import OrderPageInfo from './OrderPageInfo';

const OrderReviewPage = () => {
  const {
    isJejuOrRemoteArea,
    actualShippingFee,
    handleJejuOrRemoteAreaToggle,
  } = useShipping();
  const { typeCount, totalCount, isDisabled } = useOrderInfo();
  const { coupons, isLoading } = useCoupon();

  const { availableCoupons } = useAvailableCoupons(
    coupons ?? [],
    isJejuOrRemoteArea
  );

  const [allCouponCombinationIds, setAllCouponCombinationIds] = useState<
    number[][]
  >([]);
  // 2. availableCoupons 값이 바뀌면 갱신
  useEffect(() => {
    setAllCouponCombinationIds(
      getCouponCombinations(availableCoupons).allCouponCombinationIds
    );
  }, [availableCoupons]);

  const handleUpdateCouponCombinations = (coupons: CouponContent[]) => {
    const combinations = getCouponCombinations(coupons).allCouponCombinationIds;
    setAllCouponCombinationIds(combinations);
  };

  const { showCouponModal, handleShowCouponModal } = useModal();
  const { handleBackClick, handleCheckout } = useNavigation(isDisabled);

  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);

  const { bestCouponIds, totalDiscount } = useBestCouponCombination(
    availableCoupons,
    allCouponCombinationIds,
    isJejuOrRemoteArea
  );

  useEffect(() => {
    setSelectedCouponIds(bestCouponIds);
  }, [bestCouponIds]);

  const handleSelectCoupons = (newCoupons: number[]) => {
    setSelectedCouponIds(newCoupons);

    // 🔥 ID로 쿠폰 객체 찾아서 조합 업데이트
    if (coupons) {
      const selectedCouponObjects = coupons.filter((coupon) =>
        newCoupons.includes(coupon.id)
      );
      handleUpdateCouponCombinations(selectedCouponObjects);
    }
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
        <DeliveryRegionSection
          checked={isJejuOrRemoteArea}
          onToggle={handleJejuOrRemoteAreaToggle}
        />
        <LabelCouponPrice
          totalDiscount={totalDiscount}
          actualShippingFee={actualShippingFee}
        />
        <CouponModal
          show={showCouponModal}
          onHide={handleShowCouponModal}
          coupons={coupons ?? []}
          isLoading={isLoading}
          availableCoupons={availableCoupons}
          bestCouponIds={selectedCouponIds} // 자동 계산된 쿠폰 ID들 추가
          totalDiscount={totalDiscount}
          handleApply={handleSelectCoupons}
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
