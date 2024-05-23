import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import GuideText from './GuideText';
import Receipt from '../Cart/Receipt';
import { calculateShippingPrice } from '../Cart/utils';

import { totalDiscountPriceState } from '@/recoil/coupons/atoms';
import { CONFIG } from '@constants/config';
import {
  orderResultState,
  shippingPriceState,
  totalPurchasePriceState,
} from '@recoil/cartItems/selectors';

interface CartFooterProps {
  type: 'CART' | 'ORDER';
}

const OrderInfo = ({ type }: CartFooterProps) => {
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceState);
  const { totalOrderPrice } = useRecoilValue(orderResultState);
  const totalPurchasePrice = useRecoilValue(totalPurchasePriceState);

  const shippingPriceWithCoupon = useRecoilValue(shippingPriceState);
  const shippingPrice = calculateShippingPrice(totalOrderPrice);
  const finalShippingPrice = type === 'ORDER' ? shippingPriceWithCoupon : shippingPrice;

  const finalPurchasePrice =
    type === 'ORDER' ? totalPurchasePrice : totalOrderPrice + finalShippingPrice;

  return (
    <section css={cartFooterSection}>
      <GuideText
        label={`총 주문 금액이 ${CONFIG.FREE_SHIPPING_CONDITION}원 이상일 경우 무료 배송됩니다.`}
      />
      <div>
        <div css={borderTopWrapper}>
          <Receipt title="주문 금액" price={totalOrderPrice} />
          {type === 'ORDER' && (
            <Receipt
              title="쿠폰 할인 금액"
              price={totalDiscountPrice > 0 ? totalDiscountPrice * -1 : 0}
            />
          )}
          <Receipt title="배송비" price={finalShippingPrice} />
        </div>
        <div css={borderTopWrapper}>
          <Receipt title="총 결제 금액" price={finalPurchasePrice} />
        </div>
      </div>
    </section>
  );
};

export default OrderInfo;

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
