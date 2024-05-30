import useCartItems from "@/hooks/carts/useCartItems";
import * as S from "./styled";

const CartDescription = () => {
  const { cartItemCount } = useCartItems();

  return (
    <S.Container>
      {cartItemCount === 0 ? (
        <S.EmptyContent>장바구니에 담은 상품이 없습니다.</S.EmptyContent>
      ) : (
        <div>현재 {cartItemCount}종류의 상품이 담겨있습니다.</div>
      )}
    </S.Container>
  );
};

export default CartDescription;
