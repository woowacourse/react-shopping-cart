import EmptyCartContainer from "./OrderContent/EmptyCartContainer/EmptyCartContainer";
import * as S from "./CartContent.styled";
import OrderContent from "./OrderContent/OrderContent";
import { useCartItemContext } from "../contexts/CartItemProvider";

export default function CartContent() {
  const { cartItems, isLoading, errorMessage } = useCartItemContext();

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!cartItems?.length) {
    return <EmptyCartContainer />;
  }

  return (
    <S.Container>
      <S.Text>현재 {cartItems.length}종류의 상품이 담겨있습니다.</S.Text>
      <OrderContent />
    </S.Container>
  );
}
