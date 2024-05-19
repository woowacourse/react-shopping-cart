import { CART } from "../../constants";
import {
  StyledCartHeaderDescription,
  StyledCartHeaderTitle,
  StyledCartHeaderWrapper,
} from "./CartHeader.styled";

export const CartHeader: React.FC<{ uniqueItemCount: number }> = ({ uniqueItemCount }) => {
  return (
    <StyledCartHeaderWrapper>
      <StyledCartHeaderTitle>장바구니</StyledCartHeaderTitle>
      {uniqueItemCount > CART.EMPTY_THRESHOLD ? (
        <StyledCartHeaderDescription>
          현재 {uniqueItemCount}종류의 상품이 담겨있습니다.
        </StyledCartHeaderDescription>
      ) : (
        <StyledCartHeaderDescription />
      )}
    </StyledCartHeaderWrapper>
  );
};
