import * as S from "./CartSection.styles";
import Header from "./Header";
import PriceSection from "./PriceSection";
import CartList from "./CartList";
import { CartProduct } from "../../../type/cart";
import useSelectedCartIds from "../../../hooks/useSelectedCartIds";

type Props = {
  cartItems: CartProduct[];
  refetch: () => void;
};

const CartSection = ({ cartItems, refetch }: Props) => {
  const { selectedCartIds, handleSelectedCartIds } =
    useSelectedCartIds(cartItems);

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
              selectedCartIds={selectedCartIds}
              onSelectCartItem={handleSelectedCartIds}
              refetch={refetch}
            />

            <PriceSection
              cartItems={cartItems}
              selectedCartIds={selectedCartIds}
            />
          </>
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default CartSection;
