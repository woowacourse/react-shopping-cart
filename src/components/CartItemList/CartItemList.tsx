import { CartItemType } from "../../types/response";
import CartItem from "../CartItem/CartItem/CartItem";
import { Container } from "./CartItemList.styles";

interface CartItemListProps {
  cartItems: CartItemType[];
  fetchCartItem: () => void;
  isSelected: (cartId: number) => boolean;
  toggleSelect: (cartId: number) => void;
}

function CartItemList({
  cartItems,
  fetchCartItem,
  isSelected,
  toggleSelect,
}: CartItemListProps) {
  return (
    <section css={Container}>
      {cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            fetchCartItem={fetchCartItem}
            isSelected={isSelected(cartItem.id)}
            toggleSelect={() => toggleSelect(cartItem.id)}
          />
        );
      })}
    </section>
  );
}

export default CartItemList;
