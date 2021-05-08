import { VFC } from 'react';
import { OrderItem } from '../../../../types';
import Container from '../../../shared/Container';
import { OrderItemCard, ProductName } from './style';

interface Props {
  item: OrderItem;
}

const OrderConfirmListItem: VFC<Props> = ({ item: { imgSrc, name, amount } }) => {
  return (
    <OrderItemCard type="horizontal" imgSrc={imgSrc}>
      <Container>
        <ProductName>{name}</ProductName>
        <p>수량: {amount}</p>
      </Container>
    </OrderItemCard>
  );
};

export default OrderConfirmListItem;
