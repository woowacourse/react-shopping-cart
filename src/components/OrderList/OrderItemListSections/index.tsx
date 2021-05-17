import { FC } from 'react';
import { Order } from '../../../types';
import OrderItemListSection from './OrderItemListSection';

interface Props {
  orders: Order[];
}

const OrderItemListSections: FC<Props> = ({ orders }) => (
  <>
    {orders.map((order) => (
      <OrderItemListSection key={order.id} order={order} />
    ))}
  </>
);

export default OrderItemListSections;
