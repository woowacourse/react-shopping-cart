import { Container, InfoText, Table } from "./OrderReceipt.styles";

interface OrderReceiptProps {
  orderCost: number;
  deliveryCost: number;
  discount: number;
  totalCost: number;
}

function OrderReceipt({
  orderCost,
  deliveryCost,
  discount,
  totalCost,
}: OrderReceiptProps) {
  return (
    <div css={Container}>
      <div css={InfoText}>
        <img src="info.svg" alt="info 아이콘" />
        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </div>
      <table css={Table}>
        <tbody>
          <tr>
            <td>주문 금액</td>
            <td>{orderCost.toLocaleString()}원</td>
          </tr>
          <tr>
            <td>쿠폰 할인 금액</td>
            <td>{discount.toLocaleString()}원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>{deliveryCost.toLocaleString()}원</td>
          </tr>
          <tr>
            <td>총 결제 금액</td>
            <td>{totalCost.toLocaleString()}원</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderReceipt;
