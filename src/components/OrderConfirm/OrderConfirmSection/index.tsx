import { VFC } from 'react';
import { CartItem } from '../../../types';
import List from '../../shared/List';
import OrderConfirmListItem from './OrderConfirmListItem';
import { InnerTitle, OrderItemListContainer } from './style';

interface Props {
  title: string;
  items: CartItem[];
}

const OrderConfirmSection: VFC<Props> = ({ title, items }) => {
  return (
    <OrderItemListContainer>
      <InnerTitle>
        {title} ({items.length}건)
      </InnerTitle>
      <List>
        {items.map((item) => (
          <OrderConfirmListItem key={item.id} item={item} />
        ))}
      </List>
    </OrderItemListContainer>
  );
};

export default OrderConfirmSection;
