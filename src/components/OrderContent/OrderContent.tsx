import React from 'react';
import Title from '../Title/Title';
import ItemList from '../ItemList/ItemList';
import CouponButton from '../CouponButton/CouponButton';
// import LabeledCheckBox from '../LabeledCheckBox/LabeledCheckBox';

function OrderContent() {
  return (
    <div>
      <CouponButton />
      <Title
        title="주문 확인"
        subTitle="총 1종류의 상품 2개를 주문합니다.<br/>
최종 결제 금액을 확인해 주세요."
      />
      <ItemList type="order" />
      {/* <LabeledCheckBox title="배송 정보" /> */}
    </div>
  );
}

export default OrderContent;
