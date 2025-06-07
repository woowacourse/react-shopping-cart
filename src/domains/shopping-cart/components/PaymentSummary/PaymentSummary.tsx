import { InfoText } from "../../../../components/InfoText/InfoText";
import { Line } from "../../../../components/Line/Line";
import { SummaryRow } from "../SummaryRow/SummaryRow";
import { paymentSummaryLayout, summaryRowBox } from "./PaymentSummary.style";

interface PaymentSummaryProps {
  price: number;
}

export function PaymentSummary({ price }: PaymentSummaryProps) {
  const deliveryFee = 10_0000 <= price ? 0 : 3000;

  return (
    <div css={paymentSummaryLayout}>
      <InfoText showImg>
        총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </InfoText>

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
