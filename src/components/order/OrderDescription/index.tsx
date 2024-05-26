import { useRecoilValue } from "recoil";
import { cartItemsState, totalCartQuantityState } from "@/stores/cartItems";
import * as S from "./styled";

const OrderDescription = () => {
  const cartItemCount = useRecoilValue(cartItemsState).length;
  const totalCartQuantity = useRecoilValue(totalCartQuantityState);

  return (
    <S.Container>
      <div>
        총 {cartItemCount}종류의 상품 {totalCartQuantity}개를 주문합니다.
      </div>
      <div>최종 결제 금액을 확인해 주세요.</div>
    </S.Container>
  );
};

export default OrderDescription;
