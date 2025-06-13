import EmptyCartContainer from "./OrderContent/EmptyCartContainer/EmptyCartContainer";
import * as S from "./CartContent.styled";
import OrderContent from "./OrderContent/OrderContent";
import { useCartItemContext } from "../contexts/CartItemProvider";
import Fallback from "@/shared/components/Fallback/Fallback";

export default function CartContent() {
  const { cartItems, isLoading, errorMessage } = useCartItemContext();

  if (isLoading) {
    return (
      <Fallback type="loading" message="장바구니 데이터를 가져오고 있습니다." />
    );
  }

  if (errorMessage) {
    return <Fallback type="error" message={errorMessage} />;
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
