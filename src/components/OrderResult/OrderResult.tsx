import * as S from "./OrderResult.styled";
import { OrderSummary } from "../../utils/orderSummary";

interface OrderResultProps {
  orderSummary: OrderSummary;
  totalPrice: number;
  orderStatus: "order" | "order-complete" | "check-payment";
}

function OrderResult({
  orderSummary,
  totalPrice,
  orderStatus,
}: OrderResultProps) {
  const titleText =
    orderStatus === "order-complete" ? "주문 확인" : "결제 확인";

  return (
    <>
      <S.OrderResultTitle>{titleText}</S.OrderResultTitle>
      <S.OrderResultDescription>
        {orderSummary.summaryText}를 주문합니다.
      </S.OrderResultDescription>
      <S.OrderResultDescription>
        최종 결제 금액을 확인해 주세요.
      </S.OrderResultDescription>
      {orderStatus === "check-payment" && (
        <>
          <S.OrderResultPriceTitle>총 결제 금액</S.OrderResultPriceTitle>
          <S.OrderResultPrice>
            {totalPrice.toLocaleString("kr")}원
          </S.OrderResultPrice>
        </>
      )}
    </>
  );
}

export default OrderResult;
