import { Container } from "../CartItemList/CartItemList.styles";
import OrderItem from "../OrderItem/OrderItem";

export default function OrderItemList() {
  return (
    <section css={Container}>
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </section>
  );
}
