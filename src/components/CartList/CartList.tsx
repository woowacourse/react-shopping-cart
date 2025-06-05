import useCartManager from "../../hooks/useCartManager";
import CartItem from "../CartItem/CartItem";
import * as S from "./CartList.styled";

function CartList() {
  const { cartData, isLoading } = useCartManager();

  if (isLoading || !cartData) {
    return <S.LoadingContent>장바구니를 불러오는 중입니다...</S.LoadingContent>;
  }

  return (
    <S.CartItemList>
      {cartData.map((cart) => (
        <CartItem key={cart.product.id} cart={cart} />
      ))}
    </S.CartItemList>
  );
}

export default CartList;
