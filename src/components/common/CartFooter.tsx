import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import Receipt from '../Cart/Receipt';

import { INFO_ICON } from '@assets/images';
import { CONFIG } from '@constants/config';
import { orderResultState } from '@recoil/cartItems/selectors';

interface CartFooterProps {
  type: 'CART' | 'ORDER';
}

const CartFooter = ({ type }: CartFooterProps) => {
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
      <div>
        <div css={borderTopWrapper}>
          <Receipt title="주문 금액" price={totalOrderPrice} />
          {type === 'ORDER' && <Receipt title="쿠폰 할인 금액" price={0} />}
          <Receipt title="배송비" price={deliveryPrice} />
        </div>
        <div css={borderTopWrapper}>
          <Receipt title="총 결제 금액" price={totalOrderPrice + deliveryPrice} />
        </div>
      </div>
    </section>
  );
};

export default CartFooter;

const cartFooterSection = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const borderTopWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  border-top: 1px solid #0000001a;
  padding: 10px 0;
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
