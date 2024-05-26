import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import Receipt from '../Cart/CartOrderInfo/Receipt';
import InformationText from '../common/InformationText';
import SeparateLine from '../common/SeparateLine';

import { MINIMUM_FREE_SHIPPING_AMOUNT } from '@/constants/cart';
import {
  deliveryPriceState,
  orderTotalPriceState,
  purchaseTotalPriceState,
} from '@/globalState/cartItems/selectors';
import { calculateTotalDiscountAmountSelector } from '@globalState/coupon/selector';

export default function OrderResult() {
  const orderTotalPrice = useRecoilValue(orderTotalPriceState);
  const deliveryPrice = useRecoilValue(deliveryPriceState);
  const totalDiscountAmount = useRecoilValue(calculateTotalDiscountAmountSelector(true));
  const totalPurchasePrice = useRecoilValue(purchaseTotalPriceState);

  return (
    <div css={orderResultContainer}>
      <InformationText>
        총 주문 금액이 {MINIMUM_FREE_SHIPPING_AMOUNT.toLocaleString('ko-KR')}원 이상일 경우 무료
        배송됩니다.
      </InformationText>
      <SeparateLine />

      <div css={orderDetailReceipt}>
        <Receipt description="주문 금액" price={orderTotalPrice} />
        <Receipt description="쿠폰 할인 금액" price={-totalDiscountAmount} />
        <Receipt description="배송비" price={deliveryPrice} />
      </div>

      <SeparateLine />
      <Receipt description="총 결제 금액" price={totalPurchasePrice} />
    </div>
  );
}

const orderResultContainer = css`
  display: flex;
  flex-direction: column;
`;

const orderDetailReceipt = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
