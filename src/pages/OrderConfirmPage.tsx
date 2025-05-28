import { useLocation } from 'react-router';
import Header from '../components/Header/Header';
import styled from '@emotion/styled';

function OrderConfirmPage() {
  const location = useLocation();
  const { price, count, totalCount } = location.state;

  return (
    <>
      <Header variant="back" />
      <Container>
        <Title>주문하기</Title>
        <Description>
          총 {count}종류의 상품 {totalCount}개를 주문합니다.
          <br /> 최종 결제 금액을 확인해 주세요.
        </Description>
        <SubTitle>총 결제 금액</SubTitle>
        <Title>{price.toLocaleString()}원</Title>
      </Container>
      <CloseButton>결제하기</CloseButton>
    </>
  );
}

export default OrderConfirmPage;

const Container = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

export const CloseButton = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  height: 64px;
  background: #bebebe;
  font-weight: 700;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
`;
