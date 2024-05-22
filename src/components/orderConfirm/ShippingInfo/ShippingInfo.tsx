import { Checkbox } from '@components/common';
import { PRICE } from '@constants/shippingCart';
import { surchargeShippingFeeAtom } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const ShippingInfo = () => {
  const [isChecked, setIsChecked] = useState(false);
  const setSurchargeShippingFee = useSetRecoilState(surchargeShippingFeeAtom);

  const handleChangeCheck = () => {
    const changedIsChecked = !isChecked;
    setIsChecked(changedIsChecked);
    setSurchargeShippingFee(changedIsChecked ? PRICE.shippingFee.surcharge : 0);
  };

  return (
    <section>
      <p>배송 정보</p>
      <div>
        <Checkbox checked={isChecked} onChange={handleChangeCheck} />
        <p>제주도 및 도서 산간 지역</p>
      </div>
    </section>
  );
};

export default ShippingInfo;
