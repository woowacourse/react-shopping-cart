import React from 'react';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../recoil/selectors';

function TotalAmount() {
  const totalAmount = useRecoilValue(totalPriceSelector);
  return (
    <div>
      <div>주문 금액 : {totalAmount}</div>
      <div>배송비 : </div>
      <div>총 결제 금액 : </div>
    </div>
  );
}

export default TotalAmount;
