import { cartItems } from "../../mockData";
import { CartItemCardList } from "../cartItemCardList/CartItemCardList";
import { CartSummary } from "../cartSummary/CartSummary";
import {
  StyledCartContentSection,
  StyledContentContainer,
  StyledEmptyCartItemCard,
} from "./CartContentSection.styled";

export const CartContentSection: React.FC = () => {
  return (
    <StyledCartContentSection>
      {cartItems.length > 0 ? (
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
