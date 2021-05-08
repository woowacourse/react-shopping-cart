import { VFC } from 'react';
import { ShoppingCartItem } from '../../../types';
import List from '../../shared/List';
import OrderItem from './OrderItem';
import { InnerTitle, OrderItemListContainer } from './style';

interface Props {
  title: string;
  items: ShoppingCartItem[];
}

const OrderConfirmSection: VFC<Props> = ({ title, items }) => {
  return (
    <OrderItemListContainer>
      <InnerTitle>
        {title} ({items.length}건)
      </InnerTitle>
      <List>
        {items.map((item) => (
          <OrderItem item={item} />
        ))}
      </List>
    </OrderItemListContainer>
  );
};

export default OrderConfirmSection;
