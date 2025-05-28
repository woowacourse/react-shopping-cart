import { CartItemType } from "../../types/response";
import CartItem from "../CartItem/CartItem";

interface CartItemListProps {
  cartItems: CartItemType[];
}

function CartItemList({ cartItems }: CartItemListProps) {
  return (
    <>
      {cartItems.map((cartItem) => {
        return <CartItem key={cartItem.id} cartItem={cartItem} />;
      })}
    </>
  );
}

export default CartItemList;
