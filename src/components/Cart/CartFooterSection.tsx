import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import Receipt from './Receipt';

import { INFO_ICON } from '@assets/images';
import { CONFIG } from '@constants/config';
import { orderResultState } from '@recoil/cartItems/selectors';

export default function CartFooterSection() {
  const { totalOrderPrice, deliveryPrice } = useRecoilValue(orderResultState);

  return (
    <section css={cartFooterSection}>
      <div css={freeDeliveryGuideWrapper}>
        <span css={infoIcon}>
          <img src={INFO_ICON} />
        </span>
        <span css={freeDeliveryGuide}>
          총 주문 금액이 {CONFIG.FREE_DELIVERY_CONDITION}원 이상일 경우 무료 배송됩니다.
        </span>
      </div>
      <div css={borderTopWrapper}>
        <Receipt title="주문 금액" price={totalOrderPrice} />
        <Receipt title="배송비" price={deliveryPrice} />
        <Receipt title="총 결제 금액" price={totalOrderPrice + deliveryPrice} />
      </div>
    </section>
  );
}

const cartFooterSection = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const borderTopWrapper = css`
  border-top: 1px solid #0000001a;
`;

const freeDeliveryGuideWrapper = css`
  display: flex;
  align-items: center;
  gap: 4px;

  height: 16px;
`;

const infoIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

const freeDeliveryGuide = css`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;
