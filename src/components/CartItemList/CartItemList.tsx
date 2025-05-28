import { CartItemType } from "../../types/response";
import CartItem from "../CartItem/CartItem";

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
    <>
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
    </>
  );
}

export default CartItemList;
