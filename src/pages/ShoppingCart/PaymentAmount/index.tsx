import { useRecoilValue } from 'recoil';

import Button from '@Components/Button';

import orderAmountState from '@Selector/orderAmountState';

import { DELIVERY_FEE } from '@Constants/index';

import * as S from './style';

function PaymentAmount() {
  const allPrice = useRecoilValue(orderAmountState);

  const orderAmount = `${allPrice.toLocaleString()} 원`;
  const deliveryFee = !allPrice ? `0 원` : `${DELIVERY_FEE.toLocaleString()} 원`;
  const totalOrderPrice = `${(allPrice + (!allPrice ? 0 : DELIVERY_FEE)).toLocaleString()} 원`;

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
        <Button backgroundColor="#22a6a2" text="주문하기" />
      </S.ExpectedAmountLayout>
    </S.Container>
  );
}

export default PaymentAmount;
