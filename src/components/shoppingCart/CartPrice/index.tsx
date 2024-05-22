import { useRecoilValue } from "recoil";
import { cartPriceState } from "@/stores/cartPrice";

import * as S from "./styled";

const CartPrice = () => {
  const { orderPrice, deliveryFee, totalPrice } =
    useRecoilValue(cartPriceState);

  return (
    <S.Container>
      <S.PriceWrapper>
        <S.PriceTitle>주문 금액</S.PriceTitle>
        <S.PriceNumber>{orderPrice.toLocaleString("ko-KR")}원</S.PriceNumber>
      </S.PriceWrapper>
      <S.PriceWrapper>
        <S.PriceTitle>배송비</S.PriceTitle>
        <S.PriceNumber>{deliveryFee.toLocaleString("ko-KR")}원</S.PriceNumber>
      </S.PriceWrapper>
      <S.PriceWrapper>
        <S.PriceTitle>총 결제 금액</S.PriceTitle>
        <S.PriceNumber>{totalPrice.toLocaleString("ko-KR")}원</S.PriceNumber>
      </S.PriceWrapper>
    </S.Container>
  );
};

export default CartPrice;
