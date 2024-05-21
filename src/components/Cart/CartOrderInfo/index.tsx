import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import FreeShippingInfo from './FreeShippingInfo';
import Receipt from './Receipt';

import { orderTotalPriceState, deliveryPriceState } from '@recoil/cartItems/selectors';

export default function CartOrderInfo() {
  const totalPrice = useRecoilValue(orderTotalPriceState);
  const deliveryPrice = useRecoilValue(deliveryPriceState);

  return (
    <div css={cartOrderInfoContainer}>
      <FreeShippingInfo />
      <div css={borderTopWrapper}>
        <Receipt title="주문 금액" price={totalPrice} />
        <Receipt title="배송비" price={deliveryPrice} />
        <Receipt title="총 결제 금액" price={totalPrice + deliveryPrice} />
      </div>
    </div>
  );
}

const cartOrderInfoContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const borderTopWrapper = css`
  border-top: 1px solid #0000001a;
`;
