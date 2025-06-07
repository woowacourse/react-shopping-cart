import { Line } from "../../../../components/Line/Line";
import { infoImgLayout, intoText } from "../../../common/common.style";
import { SummaryRow } from "../SummaryRow/SummaryRow";
import {
  deliveryInfoBox,
  paymentSummaryLayout,
  summaryRowBox,
} from "./PaymentSummary.style";

interface PaymentSummaryProps {
  price: number;
}

export function PaymentSummary({ price }: PaymentSummaryProps) {
  const deliveryFee = 10_0000 <= price ? 0 : 3000;

  return (
    <div css={paymentSummaryLayout}>
      <div css={deliveryInfoBox}>
        <img src="./info.png" css={infoImgLayout} />
        <p css={intoText}>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </p>
      </div>
      <Line />
      <div css={summaryRowBox}>
        <SummaryRow text="주문 금액" price={price} dataTestId="orderPrice" />
        <SummaryRow
          text="배송비"
          price={deliveryFee}
          dataTestId="deliveryFee"
        />
        <Line />
        <SummaryRow
          text="총 결제 금액"
          price={price + deliveryFee}
          dataTestId="totalPrice"
        />
      </div>
    </div>
  );
}
