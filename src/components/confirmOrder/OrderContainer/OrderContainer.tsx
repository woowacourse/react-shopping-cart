import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { appliedCouponIdsState, discountAmountState } from '../../../recoil/atoms';

import { CouponContainer, OrderItemContainer, RemoteShippingCheckBox } from '../';
import { OrderAmount } from '../../common';
import * as Styled from './OrderContainer.style';

export default function OrderContainer() {
  const setDiscountAmount = useSetRecoilState(discountAmountState);
  const setAppliedCouponIds = useSetRecoilState(appliedCouponIdsState);

  useEffect(() => {
    setDiscountAmount(0);
    setAppliedCouponIds([]);
  }, [setDiscountAmount, setAppliedCouponIds]);

  return (
    <Styled.OrderContainer>
      <OrderItemContainer />
      <CouponContainer />
      <RemoteShippingCheckBox />
      <OrderAmount pageRoute="confirmOrder" />
    </Styled.OrderContainer>
  );
}
