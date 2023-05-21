import styled from 'styled-components';
import Button from '../Common/Button';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../../recoil/checkedProductData';

const EstimatedPaymentBox = () => {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const deliveryPrice = totalPrice ? 3000 : 0;
  const orderPrice = totalPrice ? totalPrice + deliveryPrice : 0;

  return (
    <EstimatedPaymentBoxContainer>
      <EstimatedPaymentTitle>결제예상금액</EstimatedPaymentTitle>
      <EstimatedPaymentContent>
        <EstimatedPaymentInfo>
          <dt>총 상품가격</dt>
          <dd>{totalPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 배송비</dt>
          <dd>{deliveryPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 주문금액</dt>
          <dd>{orderPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
      </EstimatedPaymentContent>
      <OrderButtonWrapper>
        <Button designType='order' buttonLabel='주문하기' />
      </OrderButtonWrapper>
    </EstimatedPaymentBoxContainer>
  );
};

const EstimatedPaymentBoxContainer = styled.div`
  width: 448px;
  height: 410px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (max-width: 420px) {
    width: 330px;
    height: 372px;
  }
`;

const EstimatedPaymentTitle = styled.div`
  height: 81px;
  padding: 25px 0 20px 30px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
  font-size: 24px;
`;

const EstimatedPaymentContent = styled.div`
  padding: 30px 30px 0;

  & > :last-child {
    padding-top: 41px;
  }
`;

const EstimatedPaymentInfo = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const OrderButtonWrapper = styled.div`
  padding: 40px 30px 0;
`;

export default EstimatedPaymentBox;
