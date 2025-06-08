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

function OrderConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, count, totalCount } = location.state;
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [remoteArea, setRemoteArea] = useState(false);

  // 임시 데이터 - 실제로는 location.state에서 받아와야 함
  const productName = '이름';
  const productPrice = 35000;
  const productQuantity = 2;
  const productTotal = productPrice * productQuantity;
  const couponDiscount = 6000;
  const baseShippingFee = productTotal >= SHIPPING_FEE_THRESHOLD ? 0 : 3000;

  const remoteAreaFee = remoteArea ? REMOTE_SHIPPING_FEE : 0;
  const totalShippingFee = baseShippingFee + remoteAreaFee;

  const finalTotal = productTotal - couponDiscount + totalShippingFee;

  const handleRemoteAreaChange = () => {
    setRemoteArea(!remoteArea);
  };

  return (
    <>
      <Header variant="back" />
      <Container>
        <CartHeader
          title="주문 확인"
          description={`총 ${count}종류의 상품 ${totalCount}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
        />

        <ProductSection>
          <ProductImage src="https://via.placeholder.com/80" alt="상품 이미지" />
          <ProductInfo>
            <ProductName>{productName}</ProductName>
            <ProductPrice>{productPrice.toLocaleString()}원</ProductPrice>
            <ProductQuantity>{productQuantity}개</ProductQuantity>
          </ProductInfo>
        </ProductSection>

        <CouponSelectButton onClick={() => setIsCartModalOpen(true)}>쿠폰 적용</CouponSelectButton>

        <DeliverySection>
          <SectionTitle>배송 정보</SectionTitle>
          <DeliveryItem>
            <CouponCheckboxContainer>
              <HiddenCheckbox
                type="checkbox"
                checked={remoteArea}
                onChange={handleRemoteAreaChange}
              />
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
          price={productTotal}
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
          onClose={() => setIsCartModalOpen(false)}
        >
          <>
            <CartInfo
              description="쿠폰은 최대 2개까지 사용할 수 있습니다."
              style={{ marginTop: '32px' }}
            />
            <CouponListContainer>
              {COUPONS.map((coupon) => (
                <CouponContainer key={coupon.id}>
                  <CouponCheckboxContainer>
                    <HiddenCheckbox
                      data-id={coupon.id}
                      type="checkbox"
                      checked={false}
                      onChange={() => {}}
                    />
                    <CouponStyledCheckbox checked={false} />
                  </CouponCheckboxContainer>
                  <CouponContent>
                    <CouponTitle>{coupon.description}</CouponTitle>
                    <CouponInfo>
                      <CouponDetail>만료일: {formatDate(coupon.expirationDate)}</CouponDetail>
                      {coupon.availableTime && (
                        <CouponDetail>
                          사용 가능 시간:{' '}
                          {formatTimeRange(coupon.availableTime.start, coupon.availableTime.end)}
                        </CouponDetail>
                      )}
                      {coupon.minimumAmount && (
                        <CouponDetail>
                          최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
                        </CouponDetail>
                      )}
                    </CouponInfo>
                  </CouponContent>
                </CouponContainer>
              ))}
            </CouponListContainer>
            <CouponButton onClick={() => setIsCartModalOpen(false)}>
              총 5,000원 할인 쿠폰 사용하기
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
  padding: 0 16px;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ProductSection = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px 0;
  margin: 36px 0 0 0;
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
  gap: 8px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const ProductQuantity = styled.p`
  font-size: 14px;
  color: #666;
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

const CouponStyledCheckbox = styled.div<{ checked: boolean }>`
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

const CouponTitle = styled.h4`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
`;

const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CouponDetail = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

const CouponSelectButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  background-color: white;
  margin: 16px 0 24px 0;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
    border-color: #ccc;
  }
`;
