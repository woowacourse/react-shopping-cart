import { VFC } from 'react';
import { CONFIRM } from '../../../../constants/message';
import useCart from '../../../../hooks/useCart';
import { OrderedItem, Product, Order } from '../../../../types';
import OrderListItem from './OrderListItem';
import { OrderItemListHeader, OrderList, StyledOrderItemListSection } from './styles';

interface Props {
  order: Order;
  className?: string;
}

const OrderItemListSection: VFC<Props> = ({ order: { order_id, order_details }, className }) => {
  const { addItem } = useCart();

  const onClickAddCart = (item: OrderedItem) => {
    if (!window.confirm(CONFIRM.ADD_CART)) return;

    const itemInfo: Product = {
      product_id: item.product_id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
    };

    addItem(itemInfo);
  };

  return (
    <StyledOrderItemListSection data-testid="order-section" className={className}>
      <OrderItemListHeader>
        <span>주문번호 : {order_id}</span>
        <a href="/">{'상세보기 >'}</a>
      </OrderItemListHeader>
      <OrderList>
        {order_details.map((order_detail) => (
          <OrderListItem
            key={order_detail.product_id}
            item={order_detail}
            onClick={() => onClickAddCart(order_detail)}
          />
        ))}
      </OrderList>
    </StyledOrderItemListSection>
  );
};

export default OrderItemListSection;
