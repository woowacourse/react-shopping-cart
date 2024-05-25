import React, { useState } from 'react';
import Title from '../Title/Title';
import ItemList from '../ItemList/ItemList';
import CouponButton from '../CouponButton/CouponButton';
import LabeledCheckBox from '../LabeledCheckBox/LabeledCheckBox';
import TotalAmount from '../TotalAmount/TotalAmount';
import { LABEL } from '../../constants/Label';
import { useSetRecoilState } from 'recoil';
import { remoteAreaState } from '../../recoil/atoms';

function OrderContent() {
  const [isRemoteAreaChecked, setIsRemoteAreaChecked] = useState(false);
  const setRemoteArea = useSetRecoilState(remoteAreaState);

  const handleIsRemoteAreaChecked = () => {
    setIsRemoteAreaChecked(!isRemoteAreaChecked);
    setRemoteArea((prevState) => !prevState);
  };

  return (
    <div>
      <Title
        title="주문 확인"
        subTitle="총 1종류의 상품 2개를 주문합니다.<br/>
        최종 결제 금액을 확인해 주세요."
      />
      <ItemList type="order" />
      <CouponButton />
      <LabeledCheckBox
        title={LABEL.remoteAreaTitle}
        label={LABEL.remoteArea}
        isChecked={isRemoteAreaChecked}
        onToggleCheckBox={handleIsRemoteAreaChecked}
      />
      <TotalAmount type="order" />
    </div>
  );
}

export default OrderContent;
