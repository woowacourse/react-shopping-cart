import { VFC } from 'react';
import Loading from '../../components/Loading';
import OrderItemListSections from '../../components/OrderList/OrderItemListSections';
import Template from '../../components/shared/Template';
import useFetch from '../../hooks/useFetch';
import { requestOrders } from '../../service/request/order';
import { Order } from '../../types';

const OrderListPage: VFC = () => {
  const orders = useFetch(() => requestOrders('jho2301'));

  return (
    <Template title="주문 목록">
      {orders.isLoading ? (
        <Loading />
      ) : (
        <OrderItemListSections orders={[...(orders.data as Order[])].reverse()} />
      )}
    </Template>
  );
};

export default OrderListPage;
