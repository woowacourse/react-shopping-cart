import { CartItemType } from '../../cart/types';
import OrderItem from '../orderItem/OrderItem';
import * as S from './OrderList.styles';

interface OrderListProps {
  products: CartItemType[];
}

function OrderList({ products }: OrderListProps) {
  return (
    <S.Container>
      {products.map((product) => (
        <OrderItem key={product.id} {...product} />
      ))}
    </S.Container>
  );
}

export default OrderList;
