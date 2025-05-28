import {
  paymentSummaryLayout,
  deliveryInfo,
  deliveryInfoBox,
  imgLayout,
  summaryRowBox,
} from "./PaymentSummary.style";
import { SummaryRow } from "../SummaryRow/SummaryRow";
import { Line } from "../Line/Line";
import { CartItemTypes } from "../../types/cartItem";

interface PaymentSummaryProps {
  cartItems: CartItemTypes[];
  selectedCartId: string[];
}

export function PaymentSummary({
  cartItems,
  selectedCartId,
}: PaymentSummaryProps) {
  const price = cartItems
    .filter((e) => selectedCartId.includes(e.id.toString()))
    .reduce((a, b) => a + b.product.price * b.quantity, 0);
  const deliveryFee = 10_0000 <= price ? 0 : 3000;

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
        <SummaryRow text="주문 금액" price={price} />
        <SummaryRow text="배송비" price={deliveryFee} />
        <Line />
        <SummaryRow text="총 결제 금액" price={price + deliveryFee} />
      </div>
    </div>
  );
}
