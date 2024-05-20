import { CartItemCardList } from '../cartItemCardList/CartItemCardList';
import { CartSummary } from '../cartSummary/cartSummary/CartSummary';
import {
  StyledCartContentSection,
  StyledContentContainer,
  StyledEmptyCartItemCard,
} from './CartContentSection.styled';
import { CART_MESSAGES } from '../../constants/cart';

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
        <StyledEmptyCartItemCard>{CART_MESSAGES.EMPTY}</StyledEmptyCartItemCard>
      )}
    </StyledCartContentSection>
  );
};
