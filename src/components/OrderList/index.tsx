import type { CartItemType } from "../../types";
import CartItem from "../CartItem";
import { StyledUl } from "../CartList/styles";

export default function OrderList({ items }: { items: CartItemType[] }) {
  if (items)
    return (
      <StyledUl>
        {items.map((item, index) => (
          <CartItem key={index} cartItem={item} />
        ))}
      </StyledUl>
    );
}
