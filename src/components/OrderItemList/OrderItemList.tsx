import { CartItemType } from "../../types/response";
import { Container } from "../CartItemList/CartItemList.styles";
import OrderItem from "../OrderItem/OrderItem";

interface OrderItemListProps {
  cartItems: CartItemType[];
}

export default function OrderItemList({ cartItems }: OrderItemListProps) {
  return (
    <section css={Container}>
      {cartItems.map((cartItem) => (
        <OrderItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </section>
  );
}
