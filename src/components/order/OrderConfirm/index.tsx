import { useRecoilValue } from "recoil";
import { cartItemsState, totalCartQuantityState } from "@/stores/cartItems";
import { cartPriceState } from "@/stores/cartPrice";

import * as S from "./styled";
import useDiscountCalculator from "@/hooks/coupons/useDiscountCalculator";

const OrderConfirm = () => {
  const cartItemCount = useRecoilValue(cartItemsState).length;
  const totalCartQuantity = useRecoilValue(totalCartQuantityState);
  const { totalPrice } = useRecoilValue(cartPriceState);
  const { totalDiscountPrice } = useDiscountCalculator();

  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.Info>
        <div>
          총 {cartItemCount}종류의 상품 {totalCartQuantity}개를 주문합니다.
        </div>
        <div>최종 결제 금액을 확인해 주세요.</div>
      </S.Info>
      <S.PriceWrapper>
        <S.PriceText>총 결제 금액</S.PriceText>
        <S.Price>
          {(totalPrice - totalDiscountPrice).toLocaleString("ko-KR")}원
        </S.Price>
      </S.PriceWrapper>
    </S.Container>
  );
};

export default OrderConfirm;
