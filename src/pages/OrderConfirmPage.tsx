import { useLocation, useNavigate } from 'react-router';
import Header from '../components/Header/Header';
import styled from '@emotion/styled';
import Button from '../components/Button/Button';

interface OrderDetailState {
  price: number;
  count: number;
  totalCount: number;
}

function OrderConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as OrderDetailState | undefined;

  if (!state) {
    return (
      <Button disabled={false} onClick={() => navigate('/', { replace: true })}>
        메인 페이지로 돌아가기
      </Button>
    );
  }

  return (
    <>
      <Header variant="back" />
      <Container>
        <Title>주문하기</Title>
        <Description>
          총 {state.count}종류의 상품 {state.totalCount}개를 주문합니다.
          <br /> 최종 결제 금액을 확인해 주세요.
        </Description>
        <SubTitle>총 결제 금액</SubTitle>
        <Title>{state.price.toLocaleString()}원</Title>
      </Container>
      <Button disabled={true}>결제하기</Button>
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
