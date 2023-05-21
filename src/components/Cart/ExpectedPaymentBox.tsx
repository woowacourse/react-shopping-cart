import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from '../Common/Button';

import useMultipleChecked from '../../hooks/useMultipleChecked';
import { checkedPriceState } from '../../states/checkedCartProducts/selector';

const DELIVERY_FEE = 3_000;

const ExpectedPaymentBox = () => {
  const totalPrice = useRecoilValue(checkedPriceState);
  const { isAllUnchecked } = useMultipleChecked();

  const deliveryFee = useMemo(
    () => (isAllUnchecked ? 0 : DELIVERY_FEE),
    [isAllUnchecked]
  );

  const total = useMemo(
    () => totalPrice + deliveryFee,
    [deliveryFee, totalPrice]
  );

  return (
    <ExpectedPaymentContainer>
      <ExpectedPaymentTitle>결제예상금액</ExpectedPaymentTitle>
      <ExpectedPaymentInfo>
        <PaymentInfoItem>
          <dt>총 상품가격</dt>
          <dd>{totalPrice.toLocaleString('ko-KR')}원</dd>
        </PaymentInfoItem>
        <PaymentInfoItem>
          <dt>총 배송비</dt>
          <dd>{deliveryFee.toLocaleString('ko-KR')}원</dd>
        </PaymentInfoItem>
        <PaymentInfoItem>
          <dt>총 주문금액</dt>
          <dd>{total.toLocaleString('ko-KR')}원</dd>
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
  width: 450px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const ExpectedPaymentTitle = styled.h2`
  height: 80px;
  padding: 0 30px;
  line-height: 80px;
  font-size: 24px;
  font-weight: 400;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
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
