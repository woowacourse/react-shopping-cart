import { CartItemType } from "../../../types/response";
import OrderItem from "../OrderItem/OrderItem";
import { ItemContainer } from "../OrderItem/OrderItem.styles";

interface OrderItemListProps {
  cartItems: CartItemType[];
}

export default function OrderItemList({ cartItems }: OrderItemListProps) {
  return (
    <section css={ItemContainer}>
      {cartItems.map((cartItem) => (
        <OrderItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </section>
  );
}
