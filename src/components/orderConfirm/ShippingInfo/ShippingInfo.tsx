import { Checkbox, InfoBanner } from '@components/common';
import { PRICE } from '@constants/shippingCart';
import { surchargeShippingFeeAtom } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import * as Styled from './ShippingInfo.styled';

const ShippingInfo = () => {
  const setSurchargeShippingFee = useSetRecoilState(surchargeShippingFeeAtom);

  const [isChecked, setIsChecked] = useState(false);

  const handleChangeCheck = () => {
    const changedIsChecked = !isChecked;
    setIsChecked(changedIsChecked);
    setSurchargeShippingFee(changedIsChecked ? PRICE.shippingFee.surcharge : 0);
  };

  return (
    <Styled.ShippingInfo>
      <Styled.Title>배송 정보</Styled.Title>
      <Styled.SurchargeShippingFee>
        <Checkbox checked={isChecked} onChange={handleChangeCheck} />
        <Styled.SurchargeShippingInfo>제주도 및 도서 산간 지역</Styled.SurchargeShippingInfo>
      </Styled.SurchargeShippingFee>
      <InfoBanner $padding="0">총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</InfoBanner>
    </Styled.ShippingInfo>
  );
};

export default ShippingInfo;
