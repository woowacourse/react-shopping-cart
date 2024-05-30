import useCartItems from "@/hooks/carts/useCartItems";
import * as S from "./styled";

const OrderDescription = () => {
  const { cartItemCount, totalCartItemQuantity } = useCartItems();

  return (
    <S.Container>
      <div>
        총 {cartItemCount}종류의 상품 {totalCartItemQuantity}개를 주문합니다.
      </div>
      <div>최종 결제 금액을 확인해 주세요.</div>
    </S.Container>
  );
};

export default OrderDescription;
