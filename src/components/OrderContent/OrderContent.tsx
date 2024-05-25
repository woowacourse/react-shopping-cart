import React, { useState } from 'react';
import Title from '../Title/Title';
import ItemList from '../ItemList/ItemList';
import CouponButton from '../CouponButton/CouponButton';
import LabeledCheckBox from '../LabeledCheckBox/LabeledCheckBox';
import TotalAmount from '../TotalAmount/TotalAmount';
import { LABEL } from '../../constants/Label';
import { useSetRecoilState } from 'recoil';
import { remoteAreaState } from '../../recoil/atoms';
import { useModal } from 'woowacourse-react-modal-component';
import CouponModal from '../CouponModal/CouponModal';
import * as S from './OrderContent.styled';

function OrderContent() {
  const [isRemoteAreaChecked, setIsRemoteAreaChecked] = useState(false);
  const setRemoteArea = useSetRecoilState(remoteAreaState);
  const { isOpen, toggleModal } = useModal();

  const handleIsRemoteAreaChecked = () => {
    setIsRemoteAreaChecked(!isRemoteAreaChecked);
    setRemoteArea((prevState) => !prevState);
  };

  return (
    <S.OrderContentContainer>
      <Title title={LABEL.orderTitle} subTitle={LABEL.orderSubTitle} />
      <ItemList type="order" />
      <CouponButton onToggleModal={toggleModal} />
      <LabeledCheckBox
        title={LABEL.remoteAreaTitle}
        label={LABEL.remoteArea}
        isChecked={isRemoteAreaChecked}
        onToggleCheckBox={handleIsRemoteAreaChecked}
      />
      <TotalAmount type="order" />
      <CouponModal isOpen={isOpen} onToggleModal={toggleModal} />
    </S.OrderContentContainer>
  );
}

export default OrderContent;
