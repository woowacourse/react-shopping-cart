import { CART_MESSAGES } from '../../constants/cart';
import {
  StyledCartHeaderDescription,
  StyledCartHeaderTitle,
  StyledCartHeaderWrapper,
} from './CartHeader.styled';

export const CartHeader: React.FC<{ categoryCount: number }> = ({
  categoryCount,
}) => {
  return (
    <StyledCartHeaderWrapper>
      <StyledCartHeaderTitle>장바구니</StyledCartHeaderTitle>
      {categoryCount > 0 ? (
        <StyledCartHeaderDescription>
          {CART_MESSAGES.ITEMS_PRESENT(categoryCount)}
        </StyledCartHeaderDescription>
      ) : (
        <StyledCartHeaderDescription />
      )}
    </StyledCartHeaderWrapper>
  );
};
