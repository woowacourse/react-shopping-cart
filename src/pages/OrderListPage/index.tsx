import { VFC } from 'react';
import OrderItemListSections from '../../components/OrderList/OrderItemListSections';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import { ORDERS_MOCK } from '../../mocks/mockData';

const OrderListPage: VFC = () => {
  return (
    <ReactShoppingCartTemplate title="주문 목록">
      <OrderItemListSections orders={ORDERS_MOCK} />
    </ReactShoppingCartTemplate>
  );
};

export default OrderListPage;
