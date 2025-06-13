import { InfoText } from "../../../../components/InfoText/InfoText";
import { Line } from "../../../../components/Line/Line";
import { SummaryRow } from "../SummaryRow/SummaryRow";
import { paymentSummaryLayout, summaryRowBox } from "./PaymentSummary.style";

interface PaymentSummaryProps {
  orderPrice: number;
  couponSale?: number;
  deliveryFee: number;
  totalPrice: number;
}

export function PaymentSummary({
  orderPrice,
  couponSale,
  deliveryFee,
  totalPrice,
}: PaymentSummaryProps) {
  return (
    <div css={paymentSummaryLayout}>
      <InfoText showImg>
        총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </InfoText>

      <Line />
      <div css={summaryRowBox}>
        <SummaryRow
          text="주문 금액"
          price={orderPrice}
          dataTestId="orderPrice"
        />
        {couponSale !== undefined && (
          <SummaryRow
            text="쿠폰 할인 금액"
            price={-couponSale}
            dataTestId="couponSale"
          />
        )}
        <SummaryRow
          text="배송비"
          price={deliveryFee}
          dataTestId="deliveryFee"
        />
        <Line />
        <SummaryRow
          text="총 결제 금액"
          price={totalPrice}
          dataTestId="totalPrice"
        />
      </div>
    </div>
  );
}
