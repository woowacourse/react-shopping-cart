import { CART } from "../../constants";
import {
  StyledCartHeaderDescription,
  StyledCartHeaderTitle,
  StyledCartHeaderWrapper,
} from "./CartHeader.styled";

export const CartHeader: React.FC<{ cartItemCount: number }> = ({ cartItemCount }) => {
  return (
    <StyledCartHeaderWrapper>
      <StyledCartHeaderTitle>장바구니</StyledCartHeaderTitle>
      {cartItemCount > CART.EMPTY_THRESHOLD ? (
        <StyledCartHeaderDescription>
          현재 {cartItemCount}종류의 상품이 담겨있습니다.
        </StyledCartHeaderDescription>
      ) : (
        <StyledCartHeaderDescription />
      )}
    </StyledCartHeaderWrapper>
  );
};
