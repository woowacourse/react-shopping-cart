import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { infoIcon } from '../assets';
import { Modal } from '../components/Modal';
import { CartInfo, InfoIconImage } from '../components/Cart/CartMain';

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
      </Container>
      {!isCartModalOpen && (
        <Modal
          position="center"
          width="90%"
          title="쿠폰을 선택해 주세요"
          onClose={() => setIsCartModalOpen(false)}
        >
          <>
            <CartInfo>
              <InfoIconImage src={infoIcon} alt="infoIcon" />
              <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
            </CartInfo>

            <Container>{/* 모달 내용 추가 */}</Container>
            <CouponButton>총 {5000}원 할인 쿠폰 사용하기</CouponButton>
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
