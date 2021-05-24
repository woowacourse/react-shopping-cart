import { VFC } from 'react';
import { useHistory } from 'react-router';
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
  const history = useHistory();

  const handlekAddCart = (item: OrderedItem) => {
    const { quantity, ...itemInfo } = item;

    addItem(itemInfo);
  };

  return (
    <StyledOrderItemListSection data-testid="order-section" className={className}>
      <OrderItemListHeader>
        <span>주문번호 : {order_id}</span>
      </OrderItemListHeader>
      <OrderList>
        {order_details.map((order_detail) => (
          <OrderListItem
            key={order_detail.product_id}
            item={order_detail}
            handleAddCart={() => handlekAddCart(order_detail)}
            handleLinkToProductDetail={() => history.push(`/product/${order_detail.product_id}`)}
          />
        ))}
      </OrderList>
    </StyledOrderItemListSection>
  );
};

export default OrderItemListSection;
