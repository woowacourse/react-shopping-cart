import { useEffect, useState, VFC } from 'react';
import { useHistory } from 'react-router';
import useCart from '../../../../service/hooks/useCart';
import { OrderedItem, Order } from '../../../../types';
import { FetchError } from '../../../../utils/error';
import OrderListItem from './OrderListItem';
import { OrderItemListHeader, OrderList, StyledOrderItemListSection } from './styles';

interface Props {
  order: Order;
  className?: string;
}

const OrderItemListSection: VFC<Props> = ({ order: { orderId, orderDetails }, className }) => {
  const { addItem, error } = useCart();
  const history = useHistory();

  const handlekAddCart = (item: OrderedItem) => {
    const { quantity, ...itemInfo } = item;

    addItem(itemInfo);
  };

  return (
    <StyledOrderItemListSection data-testid="order-section" className={className}>
      <OrderItemListHeader>
        <span>주문번호 : {orderId}</span>
      </OrderItemListHeader>
      <OrderList>
        {orderDetails.map((order_detail) => (
          <OrderListItem
            key={order_detail.productId}
            item={order_detail}
            handleAddCart={() => handlekAddCart(order_detail)}
            handleLinkToProductDetail={() => history.push(`/product/${order_detail.productId}`)}
          />
        ))}
      </OrderList>
    </StyledOrderItemListSection>
  );
};

export default OrderItemListSection;
