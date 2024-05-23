import { Checkbox } from '@components/common';
import { PRICE } from '@constants/shippingCart';
import { surchargeShippingFeeAtom } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import * as Styled from './ShippingInfo.styled';

const ShippingInfo = () => {
  const [surchargeShippingFee, setSurchargeShippingFee] = useRecoilState(surchargeShippingFeeAtom);

  const [isChecked, setIsChecked] = useState(!!surchargeShippingFee);

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
    </Styled.ShippingInfo>
  );
};

export default ShippingInfo;
