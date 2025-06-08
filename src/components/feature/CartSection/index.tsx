import * as S from "./CartSection.styles";
import Header from "./Header";
import PriceSection from "./PriceSection";
import CartList from "./CartList";
import { CartProduct } from "../../../type/cart";
import { useState } from "react";

type Props = {
  cartItems: CartProduct[];
  refetch: () => void;
};

const LOCAL_STORAGE_KEY = "selectedCartIds";

const CartSection = ({ cartItems, refetch }: Props) => {
  const getInitialSelectedIds = (): number[] => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }

    return cartItems.map((item) => item.id);
  };

  const [selectedCartIds, setSelectedCartIds] = useState<number[]>(
    getInitialSelectedIds
  );

  const handleSetSelectedCartIds = (newSelectedCartIds: number[]) => {
    setSelectedCartIds(newSelectedCartIds);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSelectedCartIds));
  };

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
              onSelectCartItem={handleSetSelectedCartIds}
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
