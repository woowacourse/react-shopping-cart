import { VFC } from 'react';
import { CONFIRM } from '../../../../constants/message';
import useFetchCartRedux from '../../../../hooks/useFetchCartRedux';
import { ItemInCart, Order, OrderedItem } from '../../../../types';
import OrderListItem from './OrderListItem';
import { OrderItemListHeader, OrderList, StyledOrderItemListSection } from './styles';

interface Props {
  order: Order;
  className?: string;
}

const OrderItemListSection: VFC<Props> = ({ order: { id, items }, className }) => {
  const { addItem } = useFetchCartRedux();

  const onClickAddCart = (item: OrderedItem) => {
    if (!window.confirm(CONFIRM.ADD_CART)) return;

    const newItem: ItemInCart = { ...item, checked: true };

    addItem(newItem);
  };

  return (
    <StyledOrderItemListSection data-testid="order-section" className={className}>
      <OrderItemListHeader>
        <span>주문번호 : {id}</span>
        <a href="/">{'상세보기 >'}</a>
      </OrderItemListHeader>
      <OrderList>
        {items.map((item) => (
          <OrderListItem key={item.id} item={item} onClick={() => onClickAddCart(item)} />
        ))}
      </OrderList>
    </StyledOrderItemListSection>
  );
};

export default OrderItemListSection;
