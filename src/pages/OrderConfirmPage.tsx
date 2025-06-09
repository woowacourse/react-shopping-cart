import Header from '../components/Header/Header';
import CartInfo from '../components/Cart/CartInfo';
import CartHeader from '../components/Cart/CartHeader';
import CartFooter from '../components/Cart/CartFooter';
import Button from '../components/Button/Button';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { COUPONS } from '../constants/couponConfig';
import { HiddenCheckbox } from '../components/SelectBox/SelectBox.styles';
import { REMOTE_SHIPPING_FEE, SHIPPING_FEE_THRESHOLD } from '../constants/cartConfig';
import { formatDate, formatTimeRange } from '../utils/dateTimeFormatter';
import { CartProduct } from '../types/cart';
import { Coupon } from '../types/coupon';

function OrderConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { products, price, count, totalCount, shippingFee } = location.state;

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [remoteArea, setRemoteArea] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<Coupon[]>([]);

  const calculateCouponDiscount = (coupons: Coupon[] = selectedCoupons) => {
    return coupons.reduce((total, coupon) => {
      if (coupon.discountType === 'fixed' && coupon.discount) {
        return total + coupon.discount;
      }

      if (coupon.discountType === 'percentage' && coupon.discount) {
        const discountAmount = (price * coupon.discount) / 100;
        return total + discountAmount;
      }

      if (coupon.discountType === 'buyXgetY' && coupon.buyQuantity && coupon.getQuantity) {
        const requiredQuantity = coupon.buyQuantity + coupon.getQuantity;

        const discountableItems = products
          .filter((item: CartProduct) => item.quantity >= requiredQuantity)
          .map((item: CartProduct) => {
            const numberOfSets = Math.floor(item.quantity / requiredQuantity);
            return {
              productId: item.id,
              unitPrice: item.product.price,
              discountSets: numberOfSets,
              totalDiscount: item.product.price * numberOfSets * (coupon.getQuantity as number),
            };
          })
          .sort((a, b) => b.totalDiscount - a.totalDiscount);

        const maxDiscount = discountableItems[0]?.totalDiscount || 0;
        return total + maxDiscount;
      }

      if (coupon.discountType === 'freeShipping' && coupon.minimumAmount) {
        if (price > coupon.minimumAmount) {
          return total + shippingFee;
        }
      }

      return total;
    }, 0);
  };

  const couponDiscount = calculateCouponDiscount();
  const tempCouponDiscount = calculateCouponDiscount(tempSelectedCoupons);

  const remoteAreaFee = remoteArea ? REMOTE_SHIPPING_FEE : 0;
  const totalShippingFee = shippingFee + remoteAreaFee;

  const finalTotal = price - couponDiscount + totalShippingFee;

  const isCouponAvailable = (coupon: Coupon): boolean => {
    const today = new Date();
    const expirationDate = new Date(coupon.expirationDate);

    if (expirationDate < today) {
      return false;
    }

    if (coupon.availableTime) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const currentTime = currentHour * 60 + currentMinute;

      const startTimeParts = coupon.availableTime.start.split(':');
      const startHour = Number(startTimeParts[0]);
      const startMinute = Number(startTimeParts[1]);

      const endTimeParts = coupon.availableTime.end.split(':');
      const endHour = Number(endTimeParts[0]);
      const endMinute = Number(endTimeParts[1]);

      const startTime = startHour * 60 + startMinute;
      const endTime = endHour * 60 + endMinute;

      if (currentTime < startTime || currentTime > endTime) {
        return false;
      }
    }

    return true;
  };

  const toggleRemoteArea = () => {
    setRemoteArea((prev) => !prev);
  };

  const toggleCouponSelection = (coupon: Coupon) => {
    if (!isCouponAvailable(coupon)) {
      return;
    }

    setTempSelectedCoupons((prev) => {
      const isSelected = prev.some((couponItem) => couponItem.id === coupon.id);

      if (isSelected) {
        return prev.filter((couponItem) => couponItem.id !== coupon.id);
      }

      if (prev.length >= 2) {
        alert('쿠폰은 최대 2개까지 선택 가능합니다.');
        return prev;
      }

      return [...prev, coupon];
    });
  };

  const isCouponSelected = (couponId: number) => {
    return tempSelectedCoupons.some((coupon) => coupon.id === couponId);
  };

  const openCouponModal = () => {
    setTempSelectedCoupons(selectedCoupons);
    setIsCartModalOpen(true);
  };

  const closeCouponModal = () => {
    setTempSelectedCoupons([]);
    setIsCartModalOpen(false);
  };

  const applyCoupons = () => {
    setSelectedCoupons(tempSelectedCoupons);
    setIsCartModalOpen(false);
  };

  if (!location.state || !products || products.length === 0) {
    console.error('No products data received');
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

        <ProductContainer>
          {products.map((product: CartProduct) => (
            <ProductSection key={product.id}>
              <ProductImage src={product.product.imageUrl} alt={product.product.name} />
              <ProductInfo>
                <ProductName>{product.product.name}</ProductName>
                <ProductPrice>{product.product.price.toLocaleString()}원</ProductPrice>
                <ProductQuantity>{product.quantity}개</ProductQuantity>
              </ProductInfo>
            </ProductSection>
          ))}
        </ProductContainer>

        <CouponSelectButton onClick={openCouponModal}>쿠폰 적용</CouponSelectButton>

        <DeliverySection>
          <SectionTitle>배송 정보</SectionTitle>
          <DeliveryItem>
            <CouponCheckboxContainer>
              <HiddenCheckbox type="checkbox" checked={remoteArea} onChange={toggleRemoteArea} />
              <CouponStyledCheckbox checked={remoteArea} />
            </CouponCheckboxContainer>
            <DeliveryText>제주도 및 도서 산간 지역</DeliveryText>
          </DeliveryItem>
        </DeliverySection>

        <CartInfo
          style={{ marginTop: '32px' }}
          description={`총 주문 금액이 ${SHIPPING_FEE_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
        />
        <CartFooter
          price={price}
          couponDiscount={couponDiscount}
          shippingFee={totalShippingFee}
          totalPrice={finalTotal}
        />
      </Container>
      {isCartModalOpen && (
        <Modal
          position="center"
          width="90%"
          title="쿠폰을 선택해 주세요"
          onClose={closeCouponModal}
        >
          <>
            <CartInfo
              description="쿠폰은 최대 2개까지 사용할 수 있습니다."
              style={{ marginTop: '32px' }}
            />
            <CouponListContainer>
              {COUPONS.map((coupon) => {
                const isAvailable = isCouponAvailable(coupon);
                const isSelected = isCouponSelected(coupon.id);
                const isSelectable = isAvailable && (tempSelectedCoupons.length < 2 || isSelected);

                return (
                  <CouponContainer key={coupon.id}>
                    <CouponCheckboxContainer>
                      <HiddenCheckbox
                        data-id={coupon.id}
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => isSelectable && toggleCouponSelection(coupon)}
                        disabled={!isSelectable}
                      />
                      <CouponStyledCheckbox checked={isSelected} disabled={!isAvailable} />
                    </CouponCheckboxContainer>
                    <CouponContent>
                      <CouponTitle disabled={!isAvailable}>{coupon.description}</CouponTitle>
                      <CouponInfo>
                        <CouponDetail disabled={!isAvailable}>
                          만료일: {formatDate(coupon.expirationDate)}
                        </CouponDetail>
                        {coupon.availableTime && (
                          <CouponDetail disabled={!isAvailable}>
                            사용 가능 시간:{' '}
                            {formatTimeRange(coupon.availableTime.start, coupon.availableTime.end)}
                          </CouponDetail>
                        )}
                        {coupon.minimumAmount && (
                          <CouponDetail disabled={!isAvailable}>
                            최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
                          </CouponDetail>
                        )}
                      </CouponInfo>
                    </CouponContent>
                  </CouponContainer>
                );
              })}
            </CouponListContainer>
            <CouponButton onClick={applyCoupons}>
              총 {tempCouponDiscount.toLocaleString()}원 할인 쿠폰 사용하기
            </CouponButton>
          </>
        </Modal>
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

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const ProductSection = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px 0;
  border-top: 1px solid #e5e5e5;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

const ProductPrice = styled.p`
  margin: 4px 0 0 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
`;

const ProductQuantity = styled.p`
  margin: 24px 0 0 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

const DeliverySection = styled.div`
  margin-top: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const DeliveryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const DeliveryText = styled.p`
  font-size: 14px;
`;

const CouponButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  height: 48px;
  border-radius: 8px;
  border: none;
  background-color: #333333;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
  margin-top: 24px;

  &:hover {
    background-color: #555;
  }
`;

const CouponListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 20px 0;
  max-height: 400px;
  overflow-y: auto;
`;

const CouponCheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
`;

const CouponStyledCheckbox = styled.div<{ checked: boolean; disabled?: boolean }>`
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

const CouponContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  padding: 20px 0;
  border-bottom: 1px solid #0000001a;

  &:first-of-type {
    border-top: 1px solid #0000001a;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const CouponContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const CouponTitle = styled.h4<{ disabled?: boolean }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
  color: ${(props) => (props.disabled ? '#0000001A' : '#000')};
`;

const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CouponDetail = styled.p<{ disabled?: boolean }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${(props) => (props.disabled ? '#0000001A' : '#666')};
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
