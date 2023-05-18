import { useRecoilValue } from 'recoil';

import Button from '@Components/Button';

import usePaymentAmount from '@Hooks/usePaymentAmount';

import orderAmountState from '@Selector/orderAmountState';

import * as S from './style';

function PaymentAmount() {
  const { orderAmount, deliveryFee, totalOrderPrice } = usePaymentAmount(useRecoilValue(orderAmountState));

  return (
    <S.Container>
      <S.Title aria-label="결제 예상 금액">결제 예상 금액</S.Title>
      <S.ExpectedAmountLayout>
        <S.AmountWrapper aria-label="총 상품가격">
          <S.AmountCategory>총 상품가격</S.AmountCategory>
          <S.Amount>{orderAmount}</S.Amount>
        </S.AmountWrapper>
        <S.AmountWrapper aria-label="총 배송비">
          <S.AmountCategory>총 배송비</S.AmountCategory>
          <S.Amount>{deliveryFee}</S.Amount>
        </S.AmountWrapper>
        <S.AmountWrapper aria-label="총 주문가격">
          <S.AmountCategory>총 주문가격</S.AmountCategory>
          <S.Amount>{totalOrderPrice}</S.Amount>
        </S.AmountWrapper>
        <Button text="주문하기" />
      </S.ExpectedAmountLayout>
    </S.Container>
  );
}

export default PaymentAmount;
