import { css } from '@emotion/react';

import { MINIMUM_FREE_SHIPPING_AMOUNT } from '@/constants/cart';
import { INFO_ICON } from '@assets/images';

export default function FreeShippingInfo() {
  return (
    <div css={freeDeliveryGuideWrapper}>
      <span css={infoIcon}>
        <img src={INFO_ICON} alt="info icon" />
      </span>
      <span css={freeDeliveryGuide}>
        총 주문 금액이 {MINIMUM_FREE_SHIPPING_AMOUNT.toLocaleString('ko-KR')}원 이상일 경우 무료
        배송됩니다.
      </span>
    </div>
  );
}

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
