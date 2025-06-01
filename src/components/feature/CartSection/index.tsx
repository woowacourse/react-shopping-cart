import * as S from "./CartSection.styles";
import Header from "./Header";
import PriceSection from "./PriceSection";
import useGetCartItem from "../../../hooks/useGetCartItem";
import { useSelectedCart } from "../../../hooks/useSelectedCart";
import CartList from "./CartList";

const CartSection = () => {
  const { cartItems, refetch } = useGetCartItem();
  const { selectedCartId, setSelectedCartId } = useSelectedCart(cartItems);

  return (
    <S.Container>
      <S.Wrapper>
        <Header />
        {cartItems?.length === 0 ? (
          <S.EmptyCartContainer data-testid="empty-page">
            장바구니에 담은 상품이 없습니다.
          </S.EmptyCartContainer>
        ) : (
          <>
            <S.Description>
              현재 {cartItems?.length}종류의 상품이 담겨있습니다.
            </S.Description>

            <CartList
              cartItems={cartItems}
              selectedCartId={selectedCartId}
              setSelectedCartId={setSelectedCartId}
              refetch={refetch}
            />

            <PriceSection
              cartItems={cartItems}
              selectedCartId={selectedCartId}
            />
          </>
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default CartSection;
