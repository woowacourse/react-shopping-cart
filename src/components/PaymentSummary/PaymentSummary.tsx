import {
  deliveryInfo,
  deliveryInfoBox,
  imgLayout,
} from "./PaymentSummary.style";

interface PaymentSummaryProps {}

export function PaymentSummary() {
  return (
    <div>
      <div css={deliveryInfoBox}>
        <img src="./info.png" css={imgLayout} />
        <p css={deliveryInfo}>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </p>
      </div>
    </div>
  );
}
