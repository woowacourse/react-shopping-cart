import { useLocation, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import {
  Container,
  Summary,
  Title,
  TotalCost,
  TotalCostLabel,
} from "./OrderComplete.styles";
import { CartItemType } from "../../types/response";
import Header from "../../components/Header/Header";

function OrderComplete() {
  const navigate = useNavigate();

  const location = useLocation();
  const {
    state: { totalCost, cartItems },
  } = location;

  const getAllQuantity = (cartItems: CartItemType[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <Header />
      <section css={Container}>
        <h2 css={Title}>결제 확인</h2>
        <p css={Summary}>
          {`총 ${cartItems.length}종류의 상품 ${getAllQuantity(
            cartItems
          )}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
        </p>
        <p css={TotalCostLabel}>총 결제 금액</p>
        <p css={TotalCost}>{totalCost.toLocaleString()}원</p>
      </section>
      <SubmitButton
        enabled={true}
        label="장바구니로 돌아가기"
        onClick={() => navigate("/")}
      />
    </>
  );
}
export default OrderComplete;
