import { Line } from '../../Common/Line/Line';
import { SummaryRow } from '../SummaryRow/SummaryRow';
import {
  deliveryInfo,
  deliveryInfoBox,
  imgLayout,
  paymentSummaryLayout,
  summaryRowBox,
} from './PaymentSummary.style';

interface PaymentSummaryProps {
  price: number;
  couponDiscountAmount?: number;
  deliveryFee: number;
}

export function PaymentSummary({
  price,
  couponDiscountAmount,
  deliveryFee,
}: PaymentSummaryProps) {
  return (
    <div css={paymentSummaryLayout}>
      <div css={deliveryInfoBox}>
        <img src="./info.png" css={imgLayout} />
        <p css={deliveryInfo}>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </p>
      </div>
      <Line />
      <div css={summaryRowBox}>
        <SummaryRow text="주문 금액" price={price} dataTestId="orderPrice" />
        {couponDiscountAmount !== undefined ? (
          <SummaryRow
            text="쿠폰 할인 금액"
            price={couponDiscountAmount === 0 ? 0 : couponDiscountAmount * -1}
            dataTestId="CouponDiscountAmount"
          />
        ) : null}
        <SummaryRow
          text="배송비"
          price={deliveryFee}
          dataTestId="deliveryFee"
        />
        <Line />
        <SummaryRow
          text="총 결제 금액"
          price={price + deliveryFee - (couponDiscountAmount ?? 0)}
          dataTestId="totalPrice"
        />
      </div>
    </div>
  );
}
