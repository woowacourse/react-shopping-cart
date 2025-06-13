import { useState } from 'react';
import Header from '../components/Header/Header';
import CartInfo from '../components/Cart/CartInfo';
import CartHeader from '../components/Cart/CartHeader';
import CartOrderItem from '../components/Cart/CartOrderItem';
import DeliveryOptions from '../components/Cart/DeliveryOptions';
import CartFooter from '../components/Cart/CartFooter';
import Button from '../components/Button/Button';
import CouponModal from '../components/Modal/CouponModal';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router';
import { SHIPPING_FEE_THRESHOLD } from '../constants/cartConfig';
import { useOrderConfirm } from '../hooks/useOrderConfirm';
import { Coupon } from '../types/coupon';

function OrderConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkedItemIds, price, count, totalCount } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    selectedCoupons,
    setSelectedCoupons,
    remoteArea,
    toggleRemoteArea,
    totalShippingFee,
    baseShippingFee,
    remoteAreaFee,
    couponDiscount,
    finalTotal,
    products: orderProducts,
    price: orderPrice,
  } = useOrderConfirm();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCoupon = (coupons: Coupon[]) => {
    setSelectedCoupons(coupons);
    setIsModalOpen(false);
  };

  if (!location.state || !checkedItemIds || checkedItemIds.length === 0) {
    console.error('No selected items');
    navigate('/');

    return;
  }

  return (
    <>
      <Header variant="back" />
      <Container>
        <CartHeader
          title="주문 확인"
          description={`총 ${count}종류의 상품 ${totalCount}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
        />
        <CartOrderItem cart={orderProducts} />
        <CouponSelectButton onClick={handleModalOpen}>쿠폰 적용</CouponSelectButton>
        <DeliveryOptions checked={remoteArea} onToggle={toggleRemoteArea} />
        <CartInfo
          customCss={css`
            margin-top: 32px;
          `}
          description={`총 주문 금액이 ${SHIPPING_FEE_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
        />
        <CartFooter
          price={price}
          couponDiscount={couponDiscount}
          shippingFee={totalShippingFee}
          totalPrice={finalTotal}
        />
      </Container>
      {isModalOpen && (
        <CouponModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleConfirmCoupon}
          initialCoupons={selectedCoupons}
          products={orderProducts || []}
          subtotal={orderPrice || 0}
          shippingFee={baseShippingFee + remoteAreaFee}
        />
      )}
      <Button
        onClick={() =>
          navigate('/priceConfirm', {
            state: { price: price, count: count, totalCount: totalCount },
          })
        }
      >
        결제하기
      </Button>
    </>
  );
}

export default OrderConfirmPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const CouponCheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
`;

export const CouponStyledCheckbox = styled.div<{ checked: boolean; disabled?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: ${(props) => (props.checked ? '#333' : '#fff')};
  border: 2px solid ${(props) => (props.checked ? '#333' : '#ddd')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &::after {
    content: '';
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    display: ${(props) => (props.checked ? 'block' : 'none')};
    margin-bottom: 2px;
  }

  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

const CouponSelectButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 48px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  background-color: white;
  margin: 8px 0 24px 0;
  font-size: 15px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
    border-color: #ccc;
  }
`;
