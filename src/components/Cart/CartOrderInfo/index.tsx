import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import Receipt from './Receipt';

import { MINIMUM_FREE_SHIPPING_AMOUNT } from '@/constants/cart';
import InformationText from '@components/common/InformationText';
import { orderTotalPriceState, deliveryPriceState } from '@recoil/cartItems/selectors';

export default function CartOrderInfo() {
  const totalPrice = useRecoilValue(orderTotalPriceState);
  const deliveryPrice = useRecoilValue(deliveryPriceState);

  return (
    <div css={cartOrderInfoContainer}>
      <InformationText>
        총 주문 금액이 {MINIMUM_FREE_SHIPPING_AMOUNT.toLocaleString('ko-KR')}원 이상일 경우 무료
        배송됩니다.
      </InformationText>
      <div css={borderTopWrapper}>
        <Receipt description="주문 금액" price={totalPrice} />
        <Receipt description="배송비" price={deliveryPrice} />
        <Receipt description="총 결제 금액" price={totalPrice + deliveryPrice} />
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
