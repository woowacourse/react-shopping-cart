import * as S from './OrderList.styled';
import OrderItem from '@features/order/ui/OrderItem';
import { CartItemType } from '@entities/cart/type/cartItem.type';

interface OrderListProps {
  orderItems: CartItemType[];
}

export default function OrderList({ orderItems }: OrderListProps) {
  return (
    <S.Container>
      {orderItems.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </S.Container>
  );
}
