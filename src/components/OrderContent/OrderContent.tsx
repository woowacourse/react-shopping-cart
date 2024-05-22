import React from 'react';
import Title from '../Title/Title';
import ItemList from '../ItemList/ItemList';
import CouponButton from '../CouponButton/CouponButton';
import LabeledCheckBox from '../LabeledCheckBox/LabeledCheckBox';
import TotalAmount from '../TotalAmount/TotalAmount';

function OrderContent() {
  return (
    <div>
      <Title
        title="주문 확인"
        subTitle="총 1종류의 상품 2개를 주문합니다.<br/>
        최종 결제 금액을 확인해 주세요."
      />
      <ItemList type="order" />
      <CouponButton />
      <LabeledCheckBox title="배송 정보" />
      <TotalAmount type="order" />
    </div>
  );
}

export default OrderContent;
