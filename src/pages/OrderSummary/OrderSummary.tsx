import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import {
  Container,
  Summary,
  Title,
  TotalCost,
  TotalCostLabel,
} from "./OrderSummary.styles";
import { CartItemType } from "../../types/response";
import { getDeliveryCost, getOrderCost } from "../../utils/cost";

function OrderSummary() {
  const location = useLocation();
  const { state: cartItems } = location;

  const getAllQuantity = (cartItems: CartItemType[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const orderCost = getOrderCost(cartItems);
  const totalCost = orderCost + getDeliveryCost(orderCost);

  return (
    <div>
      <Header
        icon="/public/backIcon.svg"
        handleIconClick={() => alert("클릭")}
      />
      <section css={Container}>
        <h2 css={Title}>주문 확인</h2>
        <p css={Summary}>
          {`총 ${cartItems.length}종류의 상품 ${getAllQuantity(
            cartItems
          )}개를 주문합니다.`}
        </p>
        <p css={Summary}> 최종 결제 금액을 확인해 주세요.</p>
        <p css={TotalCostLabel}>총 결제 금액</p>
        <p css={TotalCost}>{totalCost.toLocaleString()}원</p>
      </section>
      <SubmitButton enabled={false} label="결제하기" />
    </div>
  );
}
export default OrderSummary;
