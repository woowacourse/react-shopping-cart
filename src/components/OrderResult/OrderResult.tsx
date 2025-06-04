import { ResponseCartItem } from "../../types/types";
import * as S from "./OrderResult.styled";

function OrderResult({
  selectedCartItem,
  totalPrice,
  titleText,
}: {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
  titleText: string;
}) {
  const totalCount = selectedCartItem.reduce(
    (count, cart) => count + cart.quantity,
    0
  );

  return (
    <S.OrderResultWrapper>
      <S.OrderResultTitle>{titleText}</S.OrderResultTitle>
      <S.OrderResultDescription>
        총 {selectedCartItem.length}종류의 상품 {totalCount}개를 주문합니다.
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
