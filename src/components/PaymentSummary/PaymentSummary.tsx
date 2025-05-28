import {
  paymentSummaryLayout,
  deliveryInfo,
  deliveryInfoBox,
  imgLayout,
  summaryRowBox,
} from "./PaymentSummary.style";
import { SummaryRow } from "../SummaryRow/SummaryRow";
import { Line } from "../Line/Line";

export function PaymentSummary() {
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
        <SummaryRow text="주문 금액" price={70000} />
        <SummaryRow text="배송비" price={3000} />
        <Line />
        <SummaryRow text="총 결제 금액" price={73000} />
      </div>
    </div>
  );
}
