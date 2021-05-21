import { FC } from 'react';
import OrderItemListSections from '../../components/OrderList/OrderItemListSections';
import InitialLoading from '../../components/shared/InitialLoading';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetch from '../../hooks/shared/useFetch';
import { requestOrders } from '../../service/request/order';
import { Order } from '../../types';

const OrderListPage: FC = () => {
  const orders = useFetch(requestOrders);

  return (
    <ReactShoppingCartTemplate title="주문 목록">
      <InitialLoading isLoading={orders.isLoading}>
        <OrderItemListSections orders={orders.data as Order[]} />
      </InitialLoading>
    </ReactShoppingCartTemplate>
  );
};

export default OrderListPage;
