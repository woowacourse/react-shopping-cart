import { CartItemType } from "@/apis/cartItems/cartItem.type";
import * as S from "./OrderList.styled";
import OrderItem from "./OrderItem/OrderItem";

type OrderListProps = {
  orderList: CartItemType[];
};

export default function OrderList({ orderList }: OrderListProps) {
  return (
    <S.List>
      {orderList.map((orderItem) => (
        <OrderItem key={orderItem.id} orderItem={orderItem} />
      ))}
    </S.List>
  );
}
