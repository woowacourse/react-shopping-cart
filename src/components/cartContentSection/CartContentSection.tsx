import { CartItemCardList } from "../cartItemCardList/CartItemCardList";
import { CartSummary } from "../cartSummary/cartSummary/CartSummary";
import {
  StyledCartContentSection,
  StyledContentContainer,
  StyledEmptyCartItemCard,
} from "./CartContentSection.styled";

export const CartContentSection: React.FC<{ categoryCount: number }> = ({
  categoryCount,
}) => {
  return (
    <StyledCartContentSection>
      {categoryCount > 0 ? (
        <StyledContentContainer>
          <CartItemCardList />
          <CartSummary />
        </StyledContentContainer>
      ) : (
        <StyledEmptyCartItemCard>
          장바구니에 담은 상품이 없습니다.
        </StyledEmptyCartItemCard>
      )}
    </StyledCartContentSection>
  );
};
