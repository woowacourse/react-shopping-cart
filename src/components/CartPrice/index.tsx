import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { totalAmountState } from '../../atoms/cart';

const CartPrice: React.FC = () => {
  const { totalPrice } = useRecoilValue(totalAmountState);

  const shippingCost = totalPrice === 0 ? 0 : 3000;

  return (
    <StyledWrapper>
      <StyledHeader>결제 예상 금액</StyledHeader>
      <StyledBody>
        <StyledRow>
          <StyledColumn>총 상품가격</StyledColumn>
          <StyledColumn>{totalPrice.toLocaleString('ko-KR')}원</StyledColumn>
        </StyledRow>
        <StyledRow>
          <StyledColumn>총 배송비</StyledColumn>
          <StyledColumn>{shippingCost.toLocaleString('ko-KR')}원</StyledColumn>
        </StyledRow>
        <StyledRow>
          <StyledColumn>총 주문금액</StyledColumn>
          <StyledColumn>{(totalPrice + shippingCost).toLocaleString('ko-KR')}원</StyledColumn>
        </StyledRow>
        <StyledOrderButton onClick={() => alert('상품이 준비중입니다.')}>주문하기</StyledOrderButton>
      </StyledBody>
    </StyledWrapper>
  );
};

export default CartPrice;

const StyledWrapper = styled.div`
  width: 380px;
  height: 310px;

  border: 1px solid #dddddd;
`;

const StyledHeader = styled.div`
  padding: 20px 30px;
  border-bottom: 3px solid #dddddd;

  font-size: 24px;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  padding: 38px 30px;
`;

const StyledRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledColumn = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const StyledOrderButton = styled.button`
  width: 300px;
  height: 60px;

  background-color: #333333;
  color: white;

  font-size: 24px;
`;
