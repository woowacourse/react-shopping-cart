import { FC } from 'react';
import { CONFIRM } from '../../../../constants/message';
import useCartAddItem from '../../../../hooks/useCartItems/useCartAddItem';
import { ItemInCart, Order, OrderItem } from '../../../../types';
import OrderListItem from './OrderListItem';
import { OrderItemListHeader, OrderList, StyledOrderItemListSection } from './styles';

interface Props {
  order: Order;
  className?: string;
}

const OrderItemListSection: FC<Props> = ({ order: { id, items }, className }) => {
  const { addItem } = useCartAddItem();

  const onClickAddCart = (item: OrderItem) => {
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
