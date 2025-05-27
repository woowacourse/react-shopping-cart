import Header from "../../components/Header/Header";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import {
  Container,
  Summary,
  Title,
  TotalCost,
  TotalCostLabel,
} from "./OrderSummary.styles";

function OrderSummary() {
  return (
    <div>
      <Header
        icon="/public/backIcon.svg"
        handleIconClick={() => alert("클릭")}
      />
      <section css={Container}>
        <h2 css={Title}>주문 확인</h2>
        <p css={Summary}>
          총 2종류의 상품 4래를 주문합니다. <br /> 최종 결제 금액을 확인해
          주세요.
        </p>
        <p css={TotalCostLabel}>총 결제 금액</p>
        <p css={TotalCost}>120,000원</p>
      </section>
      <SubmitButton enabled={false} label="결제하기" />
    </div>
  );
}
export default OrderSummary;
