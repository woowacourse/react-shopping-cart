import { CartItemType } from "../../types/response";
import CartItem from "../CartItem/CartItem";
import { Container } from "./CartItemList.styles";

interface CartItemListProps {
  cartItems: CartItemType[];
  updateCartItem: (cartId: number, cartItem: CartItemType) => void;
  isSelected: (cartId: number) => boolean;
  toggleSelect: (cartId: number) => void;
}

function CartItemList({
  cartItems,
  updateCartItem,
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
            updateCartItem={updateCartItem}
            isSelected={isSelected(cartItem.id)}
            toggleSelect={() => toggleSelect(cartItem.id)}
          />
        );
      })}
    </section>
  );
}

export default CartItemList;
