import { ORDER } from '../../constants/constants';
import Checkbox from '../Checkbox/Checkbox';

import { shippingFeeState, orderDiscountState, specialAreaState } from '../../recoil/atoms';

import { isOverShippingFeeFreeStore } from '../../recoil/selectors';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import * as S from './styled';

const ShippingInfo = () => {
  const [isSpecialAreaChecked, setIsSpecialAreaChecked] = useState(false);
  const [orderDiscountAmount, setOrderDiscountAmount] = useRecoilState(orderDiscountState);
  const setIsSpecialArea = useSetRecoilState(specialAreaState);
  const [shippingFeeInfo, setShippingFeeInfo] = useRecoilState(shippingFeeState);
  const isOverShippingFeeFree = useRecoilValue(isOverShippingFeeFreeStore);

  const onClickCheckbox = () => {
    const newIsSpecialAreaChecked = !isSpecialAreaChecked;

    let newShipping;
    if (isOverShippingFeeFree) {
      // NOTE : 무료배송 금액을 넘은 경우 무조건 배송비는 0원이다.
      newShipping = 0;
    } else {
      // NOTE: 무료배송 금액을 넘지 않은 경우의 배송비 설정 (도서산간 여부 반영)
      // (배송비 무료 쿠폰 유무에 상관없이 배송비는 정해짐)
      newShipping = newIsSpecialAreaChecked
        ? ORDER.BASIC_SHIPPING_FEE + ORDER.SPECIAL_AREA_ADDITIONAL_SHIPPING_FEE
        : ORDER.BASIC_SHIPPING_FEE;
    }

    setShippingFeeInfo({
      ...shippingFeeInfo,
      shipping: newShipping,
    });

    // NOTE: 배송비 무료 쿠폰을 적용한 상태에서 도서산간을 체크 혹은 해제한 경우의 혜택 금액 업데이트
    if (shippingFeeInfo.isFree) {
      const newDiscount = newIsSpecialAreaChecked
        ? orderDiscountAmount + ORDER.SPECIAL_AREA_ADDITIONAL_SHIPPING_FEE
        : orderDiscountAmount - ORDER.SPECIAL_AREA_ADDITIONAL_SHIPPING_FEE;

      setOrderDiscountAmount(newDiscount);
    }

    setIsSpecialAreaChecked(newIsSpecialAreaChecked);
    setIsSpecialArea(newIsSpecialAreaChecked);
  };

  return (
    <S.Container>
      <S.ShippingTitle>배송 정보</S.ShippingTitle>
      <S.ShippingCheckContainer>
        <Checkbox
          id="shipping-info-checkbox"
          isChecked={isSpecialAreaChecked}
          onClick={onClickCheckbox}
        />
        <S.ShippingDescription>제주도 및 도서 산간 지역</S.ShippingDescription>
      </S.ShippingCheckContainer>
    </S.Container>
  );
};

export default ShippingInfo;
