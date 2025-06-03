import { CartItemType } from "../../types/response";
import CartItem from "../CartItem/CartItem";
import { Container } from "./CartItemList.styles";

interface CartItemListProps {
  cartItems: CartItemType[];
  isSelected: (cartId: number) => boolean;
  toggleSelect: (cartId: number) => void;
  increaseQuantity: (cartId: number) => Promise<void>;
  decreaseQuantity: (cartId: number) => Promise<void>;
  deleteCartItem: (cartId: number) => Promise<void>;
}

function CartItemList({
  cartItems,
  isSelected,
  toggleSelect,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
}: CartItemListProps) {
  return (
    <section css={Container}>
      {cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            isSelected={isSelected(cartItem.id)}
            toggleSelect={() => toggleSelect(cartItem.id)}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            deleteCartItem={deleteCartItem}
          />
        );
      })}
    </section>
  );
}

export default CartItemList;
