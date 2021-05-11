import { VFC } from 'react';
import useFetchCartRedux from '../../../../hooks/useFetchCartRedux';
import { Order } from '../../../../types';
import OrderListItem from './OrderListItem';
import { OrderItemListHeader, OrderList, StyledOrderItemListSection } from './styles';

interface Props {
  order: Order;
  className?: string;
}

const OrderItemListSection: VFC<Props> = ({ order: { id, items }, className }) => {
  const { addItem } = useFetchCartRedux();

  return (
    <StyledOrderItemListSection className={className}>
      <OrderItemListHeader>
        <span>주문번호 : {id}</span>
        <a href="/">{'상세보기 >'}</a>
      </OrderItemListHeader>
      <OrderList>
        {items.map((item) => (
          <OrderListItem item={item} onClick={() => addItem(item)} />
        ))}
      </OrderList>
    </StyledOrderItemListSection>
  );
};

export default OrderItemListSection;
