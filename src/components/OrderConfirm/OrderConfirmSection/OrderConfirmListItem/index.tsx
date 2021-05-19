import { VFC } from 'react';
import { CartItem } from '../../../../types';
import Container from '../../../shared/Container';
import { OrderItemCard, ProductName } from './style';

interface Props {
  item: CartItem;
}

const OrderConfirmListItem: VFC<Props> = ({ item: { image, name, quantity } }) => (
  <OrderItemCard type="horizontal" image={image}>
    <Container data-testid="order-confirm-list-item">
      <ProductName>{name}</ProductName>
      <p>수량: {quantity}</p>
    </Container>
  </OrderItemCard>
);

export default OrderConfirmListItem;
