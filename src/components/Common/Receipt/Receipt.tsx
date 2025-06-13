import { InfoText, Table } from "./Receipt.styles";
import { Info } from "../../../constants/images";

interface ReceiptProps {
  orderCost: number;
  deliveryCost: number;
  discount?: number;
}

function Receipt({ orderCost, deliveryCost, discount }: ReceiptProps) {
  const totalCost = orderCost + deliveryCost - (discount || 0);

  return (
    <div>
      <div css={InfoText}>
        <img src={Info} alt="info 아이콘" />
        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </div>
      <table css={Table}>
        <tbody>
          <tr>
            <td>주문 금액</td>
            <td>{orderCost.toLocaleString()}원</td>
          </tr>
          {discount !== undefined && (
            <tr>
              <td>쿠폰 할인 금액</td>
              <td>-{discount.toLocaleString()}원</td>
            </tr>
          )}
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

export default Receipt;
