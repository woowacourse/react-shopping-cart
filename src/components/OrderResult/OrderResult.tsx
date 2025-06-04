import { ResponseCartItem } from "../../types/types";
import * as S from "./OrderResult.styled";

function OrderResult({
  selectedCartItem,
  totalPrice,
  orderStatus,
}: {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
  orderStatus: "order" | "order-complete" | "check-payment";
}) {
  const totalCount = selectedCartItem.reduce(
    (count, cart) => count + cart.quantity,
    0
  );

  const titleText =
    orderStatus === "order-complete" ? "주문 확인" : "결제 확인";

  return (
    <>
      <S.OrderResultTitle>{titleText}</S.OrderResultTitle>
      <S.OrderResultDescription>
        총 {selectedCartItem.length}종류의 상품 {totalCount}개를 주문합니다.
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
