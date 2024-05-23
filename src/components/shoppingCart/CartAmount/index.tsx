import { useRecoilValue } from "recoil";
import { cartAmountState } from "@/stores/cartAmount";

import * as S from "./styled";

const CartAmount = () => {
  const { orderAmount, shippingFee, totalAmount } =
    useRecoilValue(cartAmountState);

  return (
    <S.Container>
      <S.PriceWrapper>
        <S.PriceTitle>주문 금액</S.PriceTitle>
        <S.PriceNumber>{orderAmount.toLocaleString("ko-KR")}원</S.PriceNumber>
      </S.PriceWrapper>
      <S.PriceWrapper>
        <S.PriceTitle>배송비</S.PriceTitle>
        <S.PriceNumber>{shippingFee.toLocaleString("ko-KR")}원</S.PriceNumber>
      </S.PriceWrapper>
      <S.PriceWrapper>
        <S.PriceTitle>총 결제 금액</S.PriceTitle>
        <S.PriceNumber>{totalAmount.toLocaleString("ko-KR")}원</S.PriceNumber>
      </S.PriceWrapper>
    </S.Container>
  );
};

export default CartAmount;
