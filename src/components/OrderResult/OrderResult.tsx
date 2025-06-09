import { calcTotalQuantity } from "../../domains/price";
import { ResponseCartItem } from "../../types/types";
import * as S from "./OrderResult.styled";

function OrderResult({
  selectedCartItem,
  totalPrice,
}: {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
}) {
  return (
    <S.OrderResultWrapper>
      <S.OrderResultTitle>주문 확인</S.OrderResultTitle>
      <S.OrderResultDescription>
        총 {selectedCartItem.length}종류의 상품{" "}
        {calcTotalQuantity(selectedCartItem)}개를 주문합니다.
      </S.OrderResultDescription>
      <S.OrderResultDescription>
        최종 결제 금액을 확인해 주세요.
      </S.OrderResultDescription>
      <S.OrderResultPriceTitle>총 결제 금액</S.OrderResultPriceTitle>
      <S.OrderResultPrice>
        {totalPrice.toLocaleString("kr")}원
      </S.OrderResultPrice>
    </S.OrderResultWrapper>
  );
}

export default OrderResult;
