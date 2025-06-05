import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { TotalCost, TotalCostLabel } from "./OrderSummary.styles";
import { Container } from "../../styles";
import { CartItemType } from "../../types/response";
import { getDeliveryCost, getOrderCost } from "../../domains/cost";
import { BackIcon } from "../../constants/images";
import useSafeLocationState from "../../hooks/common/\buseSafeLocation";
import Description from "../../components/Description/Description";

function OrderSummary() {
  const navigate = useNavigate();

  const cartItems = useSafeLocationState<CartItemType[]>();

  const orderCost = getOrderCost(cartItems);
  const totalCost = orderCost + getDeliveryCost(orderCost);

  return (
    <>
      <Header icon={BackIcon} handleIconClick={() => navigate(-1)} />
      <section css={Container}>
        <Description
          title="주문 확인"
          subTitle={`총 ${cartItems.length}종류의 상품 ${getAllQuantity(
            cartItems
          )}개를 주문합니다.\n
최종 결제 금액을 확인해 주세요.
          `}
        />
        <p css={TotalCostLabel}>총 결제 금액</p>
        <p css={TotalCost}>{totalCost.toLocaleString()}원</p>
      </section>
      <SubmitButton enabled={false} label="결제하기" />
    </>
  );
}
export default OrderSummary;

function getAllQuantity(cartItems: CartItemType[]) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
