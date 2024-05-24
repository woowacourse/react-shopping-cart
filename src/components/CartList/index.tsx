import useSelectAllCartItem from "../../hooks/useSelectAllCartItem";

import type { CartItemType } from "../../types";
import CartItem from "../CartItem";
import CheckBox from "../common/CheckBox";

import { CartListContainer, StyledUl } from "./styles";

export default function CartList({ items }: { items: CartItemType[] }) {
  const { isAllSelected, toggleAllSelected } = useSelectAllCartItem();

  return (
    <CartListContainer>
      <CheckBox
        id="totalCheck"
        isSelected={isAllSelected}
        toggleSelected={toggleAllSelected}
        label="전체 선택"
      />
      {items && (
        <StyledUl>
          {items.map((item, index) => (
            <CartItem key={index} cartItem={item} widthCounter widthHeader />
          ))}
        </StyledUl>
      )}
    </CartListContainer>
  );
}
