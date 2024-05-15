import React from 'react';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../recoil/selectors';

function TotalAmount() {
  const totalAmount = useRecoilValue(totalPriceSelector);
  const deliveryFee = totalAmount >= 100000 ? 0 : 3000;
  const calculatedTotalAmount = totalAmount + deliveryFee;

  return (
    <div>
      <div>주문 금액 : {totalAmount}</div>
      <div>배송비 : {deliveryFee}</div>
      <div>총 결제 금액 : {calculatedTotalAmount} </div>
    </div>
  );
}

export default TotalAmount;
