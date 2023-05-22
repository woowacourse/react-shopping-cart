import { styled } from 'styled-components';
import { formatPrice } from '../../../utils/formatPrice';
import usePaymentAmount from './usePaymentAmount';

const PaymentAmount = () => {
  const { paymentAmount, deliveryFee } = usePaymentAmount();

  return (
    <PaymentAmountContainer>
      <Title>결제예상금액</Title>
      <Contents>
        <AmountTextContainer marginbottom="20px">
          <AmountText>총 상품가격</AmountText>
          <AmountText>{formatPrice(paymentAmount)}</AmountText>
        </AmountTextContainer>
        <AmountTextContainer marginbottom="40px">
          <AmountText>총 배송비</AmountText>
          <AmountText>{formatPrice(deliveryFee)}</AmountText>
        </AmountTextContainer>
        <AmountTextContainer marginbottom="45px">
          <AmountText>총 주문금액</AmountText>
          <AmountText>{formatPrice(paymentAmount + deliveryFee)}</AmountText>
        </AmountTextContainer>
        <OrderButton>주문하기</OrderButton>
      </Contents>
    </PaymentAmountContainer>
  );
};

const PaymentAmountContainer = styled.div`
  width: 448px;
  height: 410px;

  border: 1px solid #dddddd;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;

const Title = styled.h4`
  padding: 20px 30px;

  font-weight: 400;
  font-size: 24px;
  color: #333;

  border-bottom: 3px solid #dddddd;
`;

const Contents = styled.div`
  width: 100%;

  padding: 35px;
`;

const AmountTextContainer = styled.div<{ marginbottom?: string }>`
  display: flex;

  justify-content: space-between;

  margin-bottom: ${({ marginbottom }) => marginbottom || '0'};
`;

const AmountText = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #333;
`;

const OrderButton = styled.button`
  width: 100%;
  height: 73px;

  border: none;
  background-color: #333;

  font-weight: 400;
  font-size: 24px;
  color: #fff;

  cursor: pointer;
`;

export default PaymentAmount;
