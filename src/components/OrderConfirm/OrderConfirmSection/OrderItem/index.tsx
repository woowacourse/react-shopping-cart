import { VFC } from 'react';
import { ShoppingCartItem } from '../../../../types';
import Container from '../../../shared/Container';
import { OrderItemCard, ProductName } from './style';

interface Props {
  item: ShoppingCartItem;
}

const OrderItem: VFC<Props> = ({ item: { imgSrc, name, amount } }) => {
  return (
    <OrderItemCard type="horizontal" imgSrc={imgSrc}>
      <Container>
        <ProductName>{name}</ProductName>
        <p>수량: {amount}</p>
      </Container>
    </OrderItemCard>
  );
};

export default OrderItem;
