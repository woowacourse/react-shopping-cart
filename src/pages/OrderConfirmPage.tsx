import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { infoIcon } from '../assets';
import { Modal } from '../components/Modal';
import { CartInfo, InfoIconImage } from '../components/Cart/CartMain';
import { COUPONS } from '../constants/couponConfig';
import { HiddenCheckbox } from '../components/SelectBox/SelectBox.styles';

function OrderConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, count, totalCount } = location.state;
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  return (
    <>
      <Header variant="back" />
      <Container>
        <Title>주문 확인</Title>
        <Description>
          총 {count}종류의 상품 {totalCount}개를 주문합니다.
          <br /> 최종 결제 금액을 확인해 주세요.
        </Description>
        <SubTitle>총 결제 금액</SubTitle>
        <Title>{price.toLocaleString()}원</Title>
        <CouponSelectButton onClick={() => setIsCartModalOpen(true)}>쿠폰 적용</CouponSelectButton>
      </Container>
      {isCartModalOpen && (
        <Modal
          position="center"
          width="90%"
          title="쿠폰을 선택해 주세요"
          onClose={() => setIsCartModalOpen(false)}
        >
          <>
            <CartInfo style={{ marginTop: '32px' }}>
              <InfoIconImage src={infoIcon} alt="infoIcon" />
              <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
            </CartInfo>
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
                    <CouponTitle>{coupon.name}</CouponTitle>
                    <CouponInfo>
                      <CouponDetail>만료일: {coupon.expirationDate}</CouponDetail>
                      {coupon.description && <CouponDetail>{coupon.description}</CouponDetail>}
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
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000;
`;

const Description = styled.p`
  margin: 24px 0;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #0a0d13;
`;

const SubTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #0a0d13;
`;

export const CouponButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  height: 44px;
  border-radius: 5px;
  border: none;
  background-color: #333333;
  font-weight: 700;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #444444;
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
  color: #333333bf;
  width: 382px;
  height: 48px;
  border-radius: 5px;
  border: 1px solid #33333340;
  background-color: white;

  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #eaeaeaff;
  }
`;
