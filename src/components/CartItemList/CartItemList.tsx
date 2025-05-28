import { CartItemType } from "../../types/response";
import CartItem from "../CartItem/CartItem";

interface CartItemListProps {
  cartItems: CartItemType[];
  fetchCartItem: () => void;
}

function CartItemList({ cartItems, fetchCartItem }: CartItemListProps) {
  return (
    <>
      {cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            fetchCartItem={fetchCartItem}
          />
        );
      })}
    </>
  );
}

export default CartItemList;
