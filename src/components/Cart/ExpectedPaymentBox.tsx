import styled from 'styled-components';

import Button from '../Common/Button';

import useMultipleChecked from '../../hooks/useMultipleChecked';
import useExpectedPayment from '../../hooks/useCartPrice';

const ExpectedPaymentBox = () => {
  const { isAllUnchecked } = useMultipleChecked();
  const { totalProductPrice, deliveryFee, totalPrice } = useExpectedPayment();

  return (
    <ExpectedPaymentContainer>
      <ExpectedPaymentTitle>결제예상금액</ExpectedPaymentTitle>
      <ExpectedPaymentInfo>
        <PaymentInfoItem>
          <dt>총 상품가격</dt>
          <dd>{totalProductPrice}원</dd>
        </PaymentInfoItem>
        <PaymentInfoItem>
          <dt>총 배송비</dt>
          <dd>{deliveryFee}원</dd>
        </PaymentInfoItem>
        <PaymentInfoItem>
          <dt>총 주문금액</dt>
          <dd>{totalPrice}원</dd>
        </PaymentInfoItem>
      </ExpectedPaymentInfo>
      <OrderButtonWrapper>
        <Button type='button' autoSize disabled={isAllUnchecked}>
          주문하기
        </Button>
      </OrderButtonWrapper>
    </ExpectedPaymentContainer>
  );
};

const ExpectedPaymentContainer = styled.div`
  min-width: 320px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    width: 450px;
  }
`;

const ExpectedPaymentTitle = styled.h2`
  height: 80px;
  padding: 0 30px;
  line-height: 80px;
  font-size: 20px;
  font-weight: 400;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    font-size: 24px;
  }
`;

const ExpectedPaymentInfo = styled.div`
  padding: 30px 30px 0;

  & > dl + dl {
    margin: 16px 0 0 0;
  }

  & > dl:last-of-type {
    margin: 40px 0 0 0;
  }
`;

const PaymentInfoItem = styled.dl`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > dt,
  dd {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
  }
`;

const OrderButtonWrapper = styled.div`
  padding: 0 30px 30px;
  margin: 40px 0 0 0;
`;

export default ExpectedPaymentBox;
