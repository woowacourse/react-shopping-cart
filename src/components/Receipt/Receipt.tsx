import { CartItemType } from "../../types/response";
import { Container, InfoText, Table } from "./Receipt.styles";

interface ReceiptProps {
  selectedCartItems: CartItemType[];
}

const getOrderCost = (selectedCartItems: CartItemType[]) => {
  return selectedCartItems.reduce((acc, cur) => {
    return acc + cur.quantity * cur.product.price;
  }, 0);
};

function Receipt({ selectedCartItems }: ReceiptProps) {
  const orderCost = getOrderCost(selectedCartItems);
  const deliveryCost = orderCost > 100000 || orderCost === 0 ? 0 : 3000;

  return (
    <div css={Container}>
      <div css={InfoText}>
        <img src="public/info.svg" alt="info 아이콘" />
        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </div>
      <table css={Table}>
        <tbody>
          <tr>
            <td>주문 금액</td>
            <td>{orderCost.toLocaleString()}원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>{deliveryCost.toLocaleString()}원</td>
          </tr>
          <tr>
            <td>총 결제 금액</td>
            <td>{(orderCost + deliveryCost).toLocaleString()}원</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Receipt;
