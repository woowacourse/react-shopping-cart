import { VFC } from 'react';
import { CartItem } from '../../../../types';
import Container from '../../../shared/Container';
import { OrderItemCard, ProductName } from './style';

interface Props {
  item: CartItem;
}

const OrderConfirmListItem: VFC<Props> = ({ item: { imageUrl, name, quantity } }) => {
  return (
    <OrderItemCard type="horizontal" image={imageUrl}>
      <Container data-testid="order-confirm-list-item">
        <ProductName>{name}</ProductName>
        <p>수량: {quantity}</p>
      </Container>
    </OrderItemCard>
  );
};

export default OrderConfirmListItem;
