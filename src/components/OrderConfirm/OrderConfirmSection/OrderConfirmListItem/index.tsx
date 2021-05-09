import { VFC } from 'react';
import { ItemInCart } from '../../../../types';
import Container from '../../../shared/Container';
import { OrderItemCard, ProductName } from './style';

interface Props {
  item: ItemInCart;
}

const OrderConfirmListItem: VFC<Props> = ({ item: { image, name, quantity } }) => {
  return (
    <OrderItemCard type="horizontal" image={image}>
      <Container>
        <ProductName>{name}</ProductName>
        <p>수량: {quantity}</p>
      </Container>
    </OrderItemCard>
  );
};

export default OrderConfirmListItem;
