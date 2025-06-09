import { useNavigate } from "react-router-dom";
import Header from "../../components/Common/Header/Header";
import SubmitButton from "../../components/Common/SubmitButton/SubmitButton";
import useSafeLocationState from "../../hooks/common/\buseSafeLocation";
import { CartItemType } from "../../types/response";
import { getAllQuantity } from "../../domains/quantity";
import {
  Container,
  Summary,
  Title,
  TotalCost,
  TotalCostLabel,
} from "./OrderComplete.styles";

interface navigateState {
  cartItems: CartItemType[];
  totalCost: number;
}

export default function OrderComplete() {
  const navigate = useNavigate();
  const state = useSafeLocationState<navigateState>();

  return (
    <>
      <Header />
      <section css={Container}>
        <h2 css={Title}>주문 확인</h2>
        <p css={Summary}>
          {`총 ${state.cartItems.length}종류의 상품 ${getAllQuantity(
            state.cartItems
          )}개를 주문합니다.`}
        </p>
        <p css={Summary}> 최종 결제 금액을 확인해 주세요.</p>
        <p css={TotalCostLabel}>총 결제 금액</p>
        <p css={TotalCost}>{state.totalCost.toLocaleString()}원</p>
      </section>
      <SubmitButton
        enabled={true}
        label="장바구니로 돌아가기"
        onClick={() => navigate("/")}
      />
    </>
  );
}
